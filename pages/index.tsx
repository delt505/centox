import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useUser from "../components/api/swr/useUser";
import Error from "../components/elements/Error";
import PageContent from "../components/elements/PageContent";
import ProfileBox from "../components/pages/profile/ProfileBox";

export default function Page() {

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    const { t } = useTranslation('common')

    return (
        <PageContent title={t("profile.title")}>
            { isError 
            ? <Error /> 
            : (isLoading 
                ? <></> 
                : 
                <ProfileBox user={user}/>
            )}
        </PageContent>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})