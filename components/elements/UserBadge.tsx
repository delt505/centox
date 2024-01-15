import { Anchor, Avatar, Box, Text } from "@mantine/core";
import Link from "next/link";
import User from "../types/user";

export default function UserBadge({ user }: { user: User }) {
    return (
        <Anchor component={Link} href={`/user/${user.id}`}>
            <Box sx={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                <Avatar src={user.avatar} radius="xl" size={'sm'}/>
                <Text weight={600}>{user.username}</Text>
            </Box>
        </Anchor>
    )
}