import { Box, ScrollArea } from "@mantine/core";
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header";
import useUser from "../../api/swr/useUser";
import LoadingScreen from "../../elements/LoadingScreen";
import Error from "../../elements/Error";

export default function Appshell({ admin, children }: { admin?: boolean, children?: any }) {

    const [isNavbarExtended, setNavbarExtended] = useState(false);
    
    const { user, isLoading, isError } = useUser({ redirectTo: '/login' });

    if(isLoading || !user) return <></>
    if(isError) return <Error />

    return (
        <Box>
            <Header isExtended={isNavbarExtended} setIsExtended={setNavbarExtended}/>
            <Box sx={{ display: 'flex' }}>
                <Sidebar isExtended={isNavbarExtended} admin={admin} />
                <ScrollArea style={{height: '100vh'}} sx={{ flexGrow: 1}}>
                    { admin ?
                        (user.role === 'admin') ? children : <Error />
                        :
                        children
                    }
                </ScrollArea>
            </Box>
        </Box>
    )
}