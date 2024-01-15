import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Error from "../components/elements/Error";
import PageContent from "../components/elements/PageContent";

export default function PageNotFound(){
    const { t } = useTranslation('common')

    return (
        <PageContent title={t("errors.page-not-found")}>
            <Error error={t("errors.page-not-found")}/>
        </PageContent>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})