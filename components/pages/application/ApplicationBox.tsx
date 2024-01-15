import { Box, Divider, Paper } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Application from "../../types/application";
import Form from "../../types/form";
import User from "../../types/user";
import ApplicationAnswers from "./ApplicationAnswers";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationInteractionBox from "./interactions/ApplicationInteractionBox";

export default function ApplicationBox({ user, application, form }: {user: User, application: Application, form: Form}) {
    
    const { t } = useTranslation('common')

    return (
        <Paper p='md' withBorder sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <ApplicationInfo form={form} user={user} application={application}/>
            <Divider labelPosition="center" label={t("application.answers")}/>
            <ApplicationAnswers form={form} application={application}/>
            <Box sx={{ marginTop: '1rem'}}>
                <ApplicationInteractionBox form={form} application={application}/>
            </Box>
        </Paper>
    )
}