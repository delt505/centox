import { Box, Button, Group, Modal, Select, Text, TextInput } from "@mantine/core";

import * as Yup from 'yup';
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";
import createWebhook from "../../api/webhooks/createWebhook";
import { useTranslation } from "next-i18next";



interface Values {
    name: string;
    event: string,
    url: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    event: Yup.string().required("The event is required."),
    url: Yup.string().required("The url is required."),
});


export default function CreateWebhookModal({ isVisible, setVisible }: { isVisible: boolean, setVisible: (visible: string) => void }) {

    const queryClient = useQueryClient()

    const [isSubmitting, setSubmitting] = useState(false);

    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            name: '',
            event: '',
            url: ''
        }
    })

    async function onSubmit({ name, event, url }: Values) {
        if(isSubmitting) return;
        setSubmitting(true)

        createWebhook({ name, event, url })
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: 'Success',
                    color: 'teal',
                    radius: 'md'
                })
                queryClient.invalidateQueries('webhooks')
            })
            .catch((error) => {
                showNotification({
                    message: error.message,
                    title: 'Error',
                    color: 'red',
                    radius: 'md'
                })
            })
        form.reset();
        setVisible('')
        setTimeout(() => setSubmitting(false), 500)
    }

    const { t } = useTranslation('common')

    return (
        <Modal opened={isVisible} onClose={() => setVisible('')} title={<Text weight={600}>{t("webhooks.create.title")}</Text>} size='lg'>
            <form onSubmit={form.onSubmit(async (values) => await onSubmit(values))}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem'}}>
                    <TextInput
                        required
                        label={t("webhooks.create.fields.name.label")}
                        placeholder={t("webhooks.create.fields.name.placeholder")}
                        {...form.getInputProps('name')}
                        sx={{ flexGrow: 1 }}
                    />
                    <Select
                        required
                        label={t("webhooks.create.fields.event.label")}
                        placeholder={t("webhooks.create.fields.event.placeholder")}
                        {...form.getInputProps('event')}
                        data={[
                            { label: t("webhooks.create.fields.event.options.all"), value: 'all' },
                            { label: t("webhooks.create.fields.event.options.comment"), value: 'onComment' },
                            { label: t("webhooks.create.fields.event.options.status"), value: 'onStatusUpdate' },
                        ]}
                        sx={{ flexGrow: 1 }}
                    />
                </Box>
                <TextInput
                    required
                    label={t("webhooks.create.fields.url.label")}
                    placeholder={t("webhooks.create.fields.url.placeholder")}
                    {...form.getInputProps('url')}
                />
                <Group position="right" mt="xl">
                    <Button type="submit" loading={isSubmitting}>{t("webhooks.create.button")}</Button>
                </Group>
            </form>
        </Modal>
    )
}