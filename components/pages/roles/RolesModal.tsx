import { Button, Group, Modal, Select, Text, TextInput } from "@mantine/core";

import Role from "../../types/role"
import * as Yup from 'yup';
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import createRole from "../../api/roles/createRole";
import { useQueryClient } from "react-query";
import deleteRole from "../../api/roles/deleteRole";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "next-i18next";


interface IRolesModalProps {
    role?: Role;
    setVisible: (visible: boolean) => void;
}

interface RolesModalValues {
    label: string;
    color: string,
    id?: string;
}


export default function RolesModal({ role, setVisible }: IRolesModalProps){

    const { t } = useTranslation('common')

    const queryClient = useQueryClient()

    const [isSubmitting, setSubmitting] = useState(false);

    const schema = Yup.object().shape({
        label: Yup.string().required(t("roles.fields.label.required")),
        color: Yup.string().required("roles.fields.color.required"),
    });

    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            label: role?.label || '',
            color: role?.color || '',
            id: role?.id || undefined,
        }
    })

    async function onSubmit({ label, color, id }: RolesModalValues) {
        if(isSubmitting) return;
        setSubmitting(true)

        createRole({ label, color, id })
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: t("random.success"),
                    color: 'teal',
                    radius: 'md'
                })
                queryClient.invalidateQueries('roles')
            })
            .catch((error) => {
                showNotification({
                    message: error.message,
                    title: t("random.error"),
                    color: 'red',
                    radius: 'md'
                })
            })

        setVisible(false)
        setTimeout(() => setSubmitting(false), 500)
    }

    async function deleteRoleWithId({ id }: { id: string }) {
        if(isSubmitting) return;
        setSubmitting(true)

        deleteRole({ id })
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: t("random.success"),
                    color: 'teal',
                    radius: 'md'
                })
                queryClient.invalidateQueries('roles')
            })
            .catch((error) => {
                showNotification({
                    message: error.message,
                    title: t("random.error"),
                    color: 'red',
                    radius: 'md'
                })
            })
        setVisible(false)
        setTimeout(() => setSubmitting(false), 500)
    }
    
    return (
        <Modal opened={true} onClose={() => setVisible(false)} title={<Text weight={600}>{role ? t("roles.menu.edit", { role: role.label}) : t("roles.menu.create")}</Text>}>
            <form onSubmit={form.onSubmit(async (values) => await onSubmit(values))}>
                <TextInput
                    required
                    label={t("roles.fields.label.label")}
                    placeholder={t("roles.fields.label.placeholder")}
                    {...form.getInputProps('label')}
                />
                <Select
                    required
                    label={t("roles.fields.color.label")}
                    placeholder={t("roles.fields.color.placeholder")}
                    {...form.getInputProps('color')}
                    data={[
                        { label: t("roles.fields.color.options.gray"), value: 'gray' },
                        { label: t("roles.fields.color.options.red"), value: 'red' },
                        { label: t("roles.fields.color.options.pink"), value: 'pink' },
                        { label: t("roles.fields.color.options.grape"), value: 'grape' },
                        { label: t("roles.fields.color.options.violet"), value: 'violet' },
                        { label: t("roles.fields.color.options.indigo"), value: 'indigo' },
                        { label: t("roles.fields.color.options.blue"), value: 'blue' },
                        { label: t("roles.fields.color.options.cyan"), value: 'cyan' },
                        { label: t("roles.fields.color.options.green"), value: 'green' },
                        { label: t("roles.fields.color.options.lime"), value: 'lime' },
                        { label: t("roles.fields.color.options.yellow"), value: 'yellow' },
                        { label: t("roles.fields.color.options.orange"), value: 'orange' },
                        { label: t("roles.fields.color.options.teal"), value: 'teal' },
                    ]}
                />
                <Group position="right" mt="xl">
                    {role && <Button onClick={() => deleteRoleWithId({ id: role.id })} color='red'>{t("roles.button.delete")}</Button>}
                    <Button type="submit" loading={isSubmitting}>{role ? t("roles.button.save") : t("roles.button.create")}</Button>
                </Group>
            </form>
        </Modal>
    )
}