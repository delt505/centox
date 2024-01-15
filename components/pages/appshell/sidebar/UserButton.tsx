import { UnstyledButton, Group, Avatar, Text, Anchor } from '@mantine/core';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';


export function UserButton({ user }: any) {

    return (
        <Anchor component={Link} href={`/profile`}>
            <UnstyledButton sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.md,
                color: theme.black,
                borderRadius: '0.25rem',
                '&:hover': {
                backgroundColor: theme.colors.gray[0],
            },
            })}>
                <Group>
                    <Avatar src={user.avatar} radius="xl" />
                    <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                            {user.username}
                        </Text>
                    </div>
                    <FaChevronRight size={14} />
                </Group>
            </UnstyledButton>
        </Anchor>
    );
}