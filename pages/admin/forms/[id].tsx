import { Box, Container } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getForm from "../../../components/api/forms/getForm";
import Error from "../../../components/elements/Error";
import LoadingScreen from "../../../components/elements/LoadingScreen";
import PageContent from "../../../components/elements/PageContent";
import FormBox from "../../../components/pages/forms/FormBox";

export default function Form(){

    const router = useRouter();
    var { id } = router.query;

    if(Array.isArray(id)) id = id[0];
    
    const { isLoading, isError, data } = useQuery(['form', id], async () => await getForm(id));


    const { t } = useTranslation('common')
    return (
        <PageContent admin={true} title={(isLoading || isError || !data || !data.form) ? t("form.title-not-loaded") : t("form.title", { form: data.form.name })}>
            { isError 
            ? <Error error={data?.message || t("errors.form-not-found")}/> 
            : (isLoading || !data || !data.form 
                ? <LoadingScreen/>
                : 
                <Container size={'md'}>
                    <Box mt={30}>
                        <FormBox form={data.form}/>
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