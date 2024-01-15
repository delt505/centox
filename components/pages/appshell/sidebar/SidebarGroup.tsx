import LinksGroup from './SidebarLinksGroup';
import { Box, Text } from "@mantine/core";

interface SidebarGroupProps {
    group: {
        group: string;
        links: [{ 
            label: string, 
            icon: any, 
            link: string, 
            links: [{ 
                label: string, 
                link: string 
            }] 
        }];
    }
}


export default function SidebarGroup({ group }: SidebarGroupProps) {

    const links = group.links.map((item: any, index: number) => <LinksGroup {...item} key={index} />);

    return (
        <Box key={group.group} sx={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
            {group.group && <Text sx={(theme) => ({ padding: `0 ${theme.spacing.xs}px` })} weight={600}>{group.group}</Text>}
            {links}
        </Box>
    )
}