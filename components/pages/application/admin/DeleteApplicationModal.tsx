import { Menu, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import deleteApplication from "../../../api/applications/deleteApplication";
import ConfirmationModal from "../../../elements/ConfirmationModal";
import Application from "../../../types/application";

export default function DeleteApplicationMenuItem({ application, isVisible, setVisible }: { application: Application, isVisible: boolean, setVisible: (visible: boolean) => void }) {

    const router = useRouter();

    const { t } = useTranslation('common')

    async function handleDeleteApplication() {
        await deleteApplication(application._id)
            .then((response) => {
                showNotification({
                    message: response?.message,
                    title: t("random.success"),
                    color: 'teal',
                    radius: 'md'
                })
                router.push('/')
            })
            .catch((error) => {
                showNotification({
                    message: error?.message,
                    title: t("random.error"),
                    color: 'red',
                    radius: 'md'
                })
            })
    }

    return (
        <ConfirmationModal 
            title={t("application.delete.title")}
            opened={isVisible} 
            setOpened={setVisible}
            buttonText={t("application.delete.confirm")}
            onConfirm={() => handleDeleteApplication()}
        >
            {t("application.delete.text")}
        </ConfirmationModal>
    )
}