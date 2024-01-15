import { Box, Avatar, Tooltip, ActionIcon, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaCrown } from "react-icons/fa";
import RoleBadge from "../../elements/RoleBadge";
import User from "../../types/user";

interface UserListItemProps {
    user: User
}

export default function UserListItem({ user }: UserListItemProps){
    const router = useRouter()

    const { t } = useTranslation('common')

    return (
        <Box component='tr' sx={{ cursor: 'pointer'}} onClick={() => router.push(`/admin/users/${user.id}`)}>
            <Box component='td' sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Avatar src={user.avatar} radius="xl" />
                <Text weight={500}>{user.username}</Text>
                {user.owner &&
                    <Tooltip withArrow label={t("user.owner")} transition='fade' transitionDuration={200} sx={{ marginLeft: '-1rem'}}>
                        <ActionIcon color="orange" radius="xs" variant="transparent"><FaCrown/></ActionIcon>
                    </Tooltip>
                }
            </Box>
            <td><RoleBadge role={user.role}/></td>
            <Box component='td'>
                <Tooltip withArrow label={dayjs(user.createdAt).format('DD/MM/YYYY, HH:mm')} transition='fade' transitionDuration={200}>
                    {/* @ts-ignore */}
                    {`${dayjs(user.createdAt).fromNow(true)} ${t("random.ago")}`}
                    {/*new Date().getTime() < user.createdAt + 127800000 ?
                        `${dayjs(user.createdAt).fromNow(true)} ago`
                        :
                        dayjs(user.createdAt).format('HH:mm, DD/MM/YYYY')
                    */}
                </Tooltip>
            </Box>
        </Box>
    )
}