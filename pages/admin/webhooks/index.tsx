import { Box, Container, Paper } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageContent from "../../../components/elements/PageContent";
import WebhookList from "../../../components/pages/webhooks/WebhookList";

export default function Webhooks(){

    const { t } = useTranslation('common')
    return (
        <PageContent admin={true} title={t("webhooks.title")}>
            <Container size={'md'}>
                <Box mt={30}>
                    <Paper withBorder p='lg'>
                        <WebhookList/>
                    </Paper>
                </Box>
            </Container>
        </PageContent>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})