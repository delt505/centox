import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles, Anchor } from '@mantine/core';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    borderRadius: '0.25rem',

    transition: 'background-color, 0.1s',

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colors.gray[3]}`,
    cursor: 'pointer',

    transition: 'background-color, 0.1s',
    
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon?: IconType | string;
  label: string;
  link?: string,
  links?: { label: string; link: string }[];
}

export default function LinksGroup({ icon: Icon, label, link, links }: LinksGroupProps) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(false);
    const ChevronIcon = theme.dir === 'ltr' ? FaChevronRight : FaChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <Link key={link.label} href={link.link}>
            <Text className={classes.link}>
                {link.label}
            </Text>
        </Link>
    ));

    return (
        <>
            { link ? 
                <>
                    <UnstyledButton className={classes.control}>
                        <Anchor component={Link} href={link}>
                            <Group position="apart" spacing={0}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {Icon &&
                                        <ThemeIcon variant="light" size={30}>
                                            {typeof Icon === 'string' || Icon instanceof String ?
                                                <i className={`${Icon}`} style={{fontSize: '18px'}}/>
                                                :
                                                <Icon size={18} />   
                                            }
                                        </ThemeIcon>
                                    }
                                    <Box ml="md">{label}</Box>
                                </Box>
                            </Group>
                        </Anchor>  
                    </UnstyledButton>              
                </>
            :
                <>
                    <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                        <Group position="apart" spacing={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {Icon &&
                                    <ThemeIcon variant="light" size={30}>
                                        {typeof Icon === 'string' || Icon instanceof String ?
                                            <i className={`${Icon}`} style={{fontSize: '18px'}}/>
                                            :
                                            <Icon size={18} />
                                        }
                                    </ThemeIcon>
                                }
                                <Box ml="md">{label}</Box>
                            </Box>
                            {hasLinks && (
                                <ChevronIcon
                                    className={classes.chevron}
                                    size={14}
                                    style={{
                                        transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                                    }}
                                />
                            )}
                        </Group>
                    </UnstyledButton>
                    {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
                </>
            }
        </>
    );
}