import { Badge, Box, Button, Sx, Table, Text, ThemeIcon, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbWebhook } from "react-icons/tb";
import { useQuery } from "react-query";
import getWebhooks from "../../api/webhooks/getWebhooks";
import Error from "../../elements/Error";
import Loading from "../../elements/Loading";
import Webhook from "../../types/webhook";
import CreateWebhookModal from "./CreateWebhookModal";
import WebhookInfoModal from "./WebhookInfoModal";

export default function WebhookList() {

    const { isLoading, isError, data } = useQuery('webhooks', getWebhooks)
    const [isVisible, setVisible] = useState('');
    const [selectedWebhook, setWebhook] = useState<Webhook | undefined>();

    const { t } = useTranslation('common')

    return (
        <>
            {(isLoading || !data) ? (isError ? <Error/> : <Loading/>) : 

            <Box>
                <Text size='xl' weight={600}>{t("webhooks.webhooks")}</Text>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    { isError ? <Error height="25vh"/> 
                        : isLoading || !data.webhooks ? <></>
                        : data.webhooks.map((webbook) => (
                            <Box 
                                key={webbook._id} 
                                sx={{ 
                                    flexGrow: 1, 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    borderRadius: '0.25rem',
                                    gap: '0.5rem',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgb(241, 243, 245)'
                                    }
                                }}
                                onClick={() => {
                                    setWebhook(webbook);
                                    setVisible('view');
                                }}
                            >
                                <TbWebhook size={20} color='#0050ff'/>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                                        <Text size='lg' weight={600}>{webbook.name}</Text>
                                        <Badge variant='dot' sx={{ cursor: 'pointer' }}>{webbook.event}</Badge>
                                    </Box>
                                    <Text size='sm' color="dimmed">{webbook.url}</Text>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Box sx={{ display: 'flex', margin: '1rem', justifyContent: 'center' }}>
                    <Button variant="outline" radius='xl' onClick={() => setVisible('create')} leftIcon={<FaPlus/>}>{t("webhooks.create.button")}</Button>
                </Box>
            </Box>
            }
            <CreateWebhookModal isVisible={isVisible == 'create'} setVisible={setVisible} />
            <WebhookInfoModal webhook={selectedWebhook} isVisible={isVisible == 'view'} setVisible={setVisible} />
        </>
    )
}