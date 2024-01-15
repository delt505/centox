import { Box, Container, Paper } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import PageContent from "../../../components/elements/PageContent";
import RolesList from "../../../components/pages/roles/RolesList";

export default function Roles(){

    const { t } = useTranslation('common')

    return (
        <PageContent admin={true} title={"roles.title"}>
            <Container size={'md'}>
                <Box mt={30}>
                    <Paper withBorder>
                        <RolesList/>
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