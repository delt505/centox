import { Anchor, Box, Center } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import login from '../components/api/auth/login';
import useUser from '../components/api/swr/useUser';
import Error from '../components/elements/Error';
import LoadingScreen from '../components/elements/LoadingScreen';
import Meta from '../components/elements/Meta';
import DiscordLoginButton from '../components/pages/login/DiscordLoginButton';

import config from '../config.json'

export default function Login() {

    const router = useRouter();
    var { code, logout } = router.query;

    const { t } = useTranslation('common')

    const { mutate, isLoading, isError } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });

    useEffect(() => {
        if(code) {
            login({ code: Array.isArray(code) ? code[0] : code })
            .then((response) => {
                mutate(response)
                router.push("/");
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [router, code, mutate]);

    if(isError) return <Error />
    if(isLoading) return <LoadingScreen/>

    return (
        <>
            <Meta title={t('login.title')}/>
            <Center style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', borderRadius: '0.25rem', padding: '1.5rem 2rem 2rem 2rem', marginBottom: '1rem' }}>
                    <Box sx={{ padding: '1.5rem 0' }}>
                        <img src={config.logo} alt="logo" style={{ width: '250px' }}/>
                    </Box>
                    <DiscordLoginButton clientId={process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID} redirectUri={process.env.NEXT_PUBLIC_DISCORD_CLIENT_REDIRECT_URI}/>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Anchor href="https://mfjobs.delt.gay" target='_blank' color='gray' size='xs'>
                        © {new Date().getFullYear()} MINEFOREST.
                    </Anchor>
                </Box>
            </Center>
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})