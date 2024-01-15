import { Box, Text, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import getUser from "../../../api/users/getUser";
import StatusBadge from "../../../elements/StatusBadge";
import UserBadge from "../../../elements/UserBadge";
import StatusUpdate from "../../../types/statusUpdate";

export default function ApplicationStatusUpdate({ interaction }: { interaction: StatusUpdate }) {

    const { isLoading, isError, data } = useQuery(['userByObjectId', interaction.user], async () => await getUser(interaction.user));

    const { t } = useTranslation('common')

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '0.2rem', justifyContent: 'center', alignItems: 'center'}}>
                {isLoading ? <Text>{t("random.loading")}</Text> : isError || !data?.user ? <Text>{t("random.error")}</Text> : <UserBadge user={data?.user}/>}
                <Text>{t("application.status")}</Text>
                <StatusBadge status={interaction.status}/>
            </Box>
            <Tooltip withArrow label={dayjs(interaction.timestamp).format('DD/MM/YYYY, HH:mm')} transition='fade' transitionDuration={200}>
                <Text weight={400} sx={{ opacity: 0.75, fontSize: 12 }}>
                    {new Date().getTime() < interaction.timestamp + 127800000 ?
                        /* @ts-ignore */
                        `${dayjs(interaction.timestamp).fromNow(true)} ${t("random.ago")}`
                        :
                        dayjs(interaction.timestamp).format('HH:mm, DD/MM/YYYY')
                    }
                </Text>
            </Tooltip>
        </Box>
    )
}