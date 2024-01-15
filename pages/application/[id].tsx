import { Box, Container } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import getApplication from "../../components/api/applications/getApplication";
import Error from "../../components/elements/Error";
import LoadingScreen from "../../components/elements/LoadingScreen";
import PageContent from "../../components/elements/PageContent";
import ApplicationBox from "../../components/pages/application/ApplicationBox";

export default function Application(){
    const router = useRouter();
    var { id } = router.query;

    if(Array.isArray(id)) id = id[0];
    const { isLoading, isError, data } = useQuery(['application', id], async () => await getApplication(id));
    
    const { t } = useTranslation('common')

    return (
        <PageContent title={(isLoading || isError || !data) ? t("application.title-not-loaded") : t("application.title", { user: data.user?.username, form: data.form?.name})}>
            { isError 
            ? <Error error={data?.message ? data?.message : t("errors.unknown")}/> 
            : (isLoading || !data || !data.user || !data.application || !data.form 
                ? <LoadingScreen/>
                : 
                <Container size={'md'}>
                    <Box mt={30} mb={30}>
                        <ApplicationBox user={data.user} application={data.application} form={data.form}/>
                    </Box>
                </Container>
            )}
        </PageContent>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})


export const getStaticPaths = async () => ({
    paths: [],
    fallback: true
})