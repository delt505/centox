import { Box, Container, Paper } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import PageContent from "../../../components/elements/PageContent";
import AppFormList from "../../../components/pages/forms/FormList";

export default function Applications(){
    const { t } = useTranslation('common')
    return (
        <PageContent admin={true} title={t("forms.title")}>
            <Container size={'md'}>
                <Box mt={30}>
                    <Paper withBorder>
                        <AppFormList/>
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