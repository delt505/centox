import { Box, Pagination, Paper, Table } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useQuery } from "react-query";
import getApplications from "../../../api/applications/getApplications";
import Error from "../../../elements/Error";
import Form from "../../../types/form";
import ApplicationListItem from "./ApplicationListItem";

export default function ApplicationList({ status, form, full }: { status: string[] | string, form: Form, full?: boolean }) {

    const [page, setPage] = useState(1);
    const { isLoading, isError, data } = useQuery(['applications', page, form], () => getApplications({ page, status, formId: form._id }), { keepPreviousData: true })

    const { t } = useTranslation('common')

    return (
        <Paper withBorder>
            <Table highlightOnHover verticalSpacing={'md'} horizontalSpacing='xl'>
                <Box component='thead'>
                    <Box component='tr'>
                        <th>{t("applications.username")}</th>
                        <th>{t("applications.status")}</th> 
                        { full && <th>{t("applications.latest-interaction")}</th> }
                        <th>{t("applications.created")}</th>
                    </Box>
                </Box>
                <tbody>
                    {
                        isError ? <tr><td colSpan={3}><Error height={'25vh'}/></td></tr> 
                            : (isLoading || !data ? <></> 
                                : data.applications?.map((application, index) => <ApplicationListItem key={index} application={application} full={full}/>))
                    }
                </tbody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem'}}>
                {!data ? <></> : <Pagination page={page} onChange={setPage} total={data.pages || 1} />}
            </Box>
        </Paper>   
    )
}