import { Box, Button, Group, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TbSend } from "react-icons/tb";
import { useQueryClient } from "react-query";
import createComment from "../../../api/applications/createComment";
import useUser from "../../../api/swr/useUser";
import Application from "../../../types/application";
import Form from "../../../types/form";
import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function ApplicationCreateComment({ form, application }: { form: Form, application: Application }) {
    const queryClient = useQueryClient()

    const { t } = useTranslation('common')

    const { isLoading, isError, user } = useUser();
    const [isSubmitting, setSubmitting] = useState(false);
    const [comment, setComment] = useState('');

    if(isLoading || isError || !user) return <></>
    if(user._id != application.user && !form.permissions[user.role]?.comment) return <></>

    function handleCreateComment(){
        if(isSubmitting) return;
        setSubmitting(true)
        createComment({ applicationId: application._id, comment })
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
        setComment('');
        setTimeout(() => setSubmitting(false), 500)
    }

    return (
        <Box sx={{ marginBottom: 14, marginLeft: 32, marginTop: 10, marginRight: 32 }}>
            <Textarea label={t("application.comment.label")} placeholder={t("application.comment.placeholder")} autosize required value={comment} onChange={(event) => setComment(event.currentTarget.value)}/>
            <Group position="right" mt="md">
                <Button 
                    variant="light"
                    rightIcon={<TbSend size={20} />}
                    radius="xl"
                    size="sm"
                    styles={{
                        root: { paddingRight: 5, height: 30 },
                        rightIcon: { marginLeft: 15 },
                    }}
                    onClick={handleCreateComment}
                    loading={isSubmitting}
                >
                    {t("application.comment.button")}
                </Button>              
            </Group>
        </Box>
        
    )
}