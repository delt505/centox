import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import createApplication from "../../api/applications/createApplication";
import Form from "../../types/form";

export default function CreateApplicationButton({ form, answers, setSaved }: { form: Form, answers: {[key: string]: string | boolean}, setSaved: (saved: boolean) => void }) {

    const { t } = useTranslation('common')

    const router = useRouter();
    const [isSubmitting, setSubmitting] = useState(false);

    const handleCreate = async () => {
        if(isSubmitting) return;
        setSubmitting(true)
        setSaved(true)

        createApplication({ formId: form._id, answers: answers })
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: 'Success',
                    color: 'teal',
                    radius: 'md'
                })
                router.push(`/application/${response.applicationId}`)
            })
            .catch((error) => {
                showNotification({
                    message: error.message,
                    title: 'Error',
                    color: 'red',
                    radius: 'md'
                })
                setTimeout(() => setSubmitting(false), 500)
            })
    }

    return (
        <Button variant="outline" color="orange" radius="xl" loading={isSubmitting} onClick={handleCreate}>
            {t("application.create")}
        </Button>
    )
}