import { Button, Group, Modal, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useQueryClient } from "react-query";
import updateStatus from "../../../api/applications/updateStatus";
import Application from "../../../types/application";

export default function UpdateStatusModal({ application, isVisible, setVisible }: { application: Application, isVisible: boolean, setVisible: (visible: boolean) => void }) {

    const queryClient = useQueryClient()

    const [status, setStatus] = useState(application.status);

    const { t } = useTranslation('common')

    async function onSubmit() {

        updateStatus({ applicationId: application._id, status: status })
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: t("random.success"),
                    color: 'teal',
                    radius: 'md'
                })
                queryClient.invalidateQueries(['application', application._id])
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
    }
    
    return (
        <Modal opened={isVisible} onClose={() => setVisible(false)} title={<Text weight={600}>{t("application.change-status.title")}</Text>}>
            <Select
                required
                label={t("application.change-status.label")}
                placeholder={t("application.change-status.placeholder")}
                value={status}
                onChange={(value: 'pending' | 'rejected' | 'accepted') => setStatus(value)}
                data={[
                    { value: 'pending', label: t("elements.status.pending") },
                    { value: 'rejected', label: t("elements.status.rejected") },
                    { value: 'accepted', label: t("elements.status.accepted") },
                ]}
            />
            <Group position="right" mt="xl" onClick={onSubmit}>
                <Button type="submit">{t("application.change-status.confirm")}</Button>
            </Group>
        </Modal>
    )
}