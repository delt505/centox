import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import deleteForm from "../../api/forms/deleteForm";
import ConfirmationModal from "../../elements/ConfirmationModal";
import Form from "../../types/form";

export default function DeleteFormButton({ isSubmitting, form }: { isSubmitting: boolean, form: Form }) {
    
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const router = useRouter();

    const { t } = useTranslation('common')

    async function handleDeleteForm() {
        await deleteForm(form._id)
        .then((response) => {
            showNotification({
                message: response.message,
                title: t("random.success"),
                color: 'teal',
                radius: 'md'
            })
            router.push('/admin/forms');
        })
        .catch((error) => {
            showNotification({
                message: error.message,
                title: t("random.error"),
                color: 'red',
                radius: 'md'
            })
        })
    }

    return (
        <>
            <Button loading={isSubmitting} color='red' variant="outline" onClick={() => setDeleteModalVisible(true)}>{t("form.delete.button")}</Button>
            <ConfirmationModal 
                title={t("form.delete.title")} 
                opened={isDeleteModalVisible} 
                setOpened={setDeleteModalVisible}
                buttonText={t("form.delete.confirm")}
                onConfirm={() => handleDeleteForm()}
            >
                {t("form.delete.text")}
            </ConfirmationModal>
        </>
    )
}