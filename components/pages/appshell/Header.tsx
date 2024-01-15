import { Box, Burger, MediaQuery } from "@mantine/core";

export default function Header({ isExtended, setIsExtended }: { isExtended: boolean, setIsExtended?: any }) {
    return (
        <MediaQuery query="(min-width: 750px)" styles={{ display: 'none'}}>
            <Box sx={{display: 'flex', justifyContent: (isExtended ? 'end' : 'start'), backgroundColor: 'white', padding: '1rem', zIndex: 2, position: (isExtended ? "fixed" : "static")}}>
                <Burger
                    opened={isExtended}
                    onClick={() => setIsExtended(!isExtended)}
                />
            </Box>
        </MediaQuery>
    )
}