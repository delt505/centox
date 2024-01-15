import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getUser from "../../components/api/users/getUser";
import Error from "../../components/elements/Error";
import LoadingScreen from "../../components/elements/LoadingScreen";
import PageContent from "../../components/elements/PageContent";
import ProfileBox from "../../components/pages/profile/ProfileBox";

export default function UserProfile(){
    const router = useRouter();
    var { id } = router.query;

    if(Array.isArray(id)) id = id[0];
    
    const { isLoading, isError, data } = useQuery(['user', id], async () => await getUser(id));
    const { t } = useTranslation('common')

    return (
        <PageContent title={(isLoading || isError || !data || !data.user) ? t("user.title-not-loaded") : t('user.title', { user: data?.user?.username })}>
            { isError 
            ? <Error error={data?.message ? data?.message : t('errors.user-not-found')}/> 
            : (isLoading || !data || !data.user 
                ? <LoadingScreen/>
                : 
                <ProfileBox user={data.user} isViewing/>
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