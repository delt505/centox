import { Box, Button, Table, Tooltip } from "@mantine/core"
import dayjs from "dayjs"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { useQuery, useQueryClient } from "react-query"
import createForm from "../../api/forms/createForm"
import getForms from "../../api/forms/getForms"
import Error from "../../elements/Error"
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications"
import { useTranslation } from "next-i18next"

export default function AppFormList() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { isLoading, isError, data } = useQuery('forms', getForms)

    const [isSubmitting, setSubmitting] = useState(false);

    const { t } = useTranslation('common')

    async function createNewForm(){
        if(isSubmitting) return;
        setSubmitting(true)

        createForm()
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: t("random.success"),
                    color: 'teal',
                    radius: 'md'
                })
                queryClient.invalidateQueries('forms')
            })
            .catch((error) => {
                showNotification({
                    message: error.message,
                    title: t("random.error"),
                    color: 'red',
                    radius: 'md'
                })
            })
        setTimeout(() => setSubmitting(false), 500)
    }
    
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Table highlightOnHover verticalSpacing={'md'} horizontalSpacing='xl'>
                    <thead>
                        <tr>
                            <th>{t("forms.name")}</th>
                            <th>{t("forms.created")}</th>
                            <th>{t("forms.updated")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isError ? <tr><td colSpan={3}><Error height={'25vh'}/></td></tr> : (isLoading || !data ? <></> : 
                            data.forms?.map((form, index) => (
                                <Box component="tr" key={index} sx={{ cursor: 'pointer' }} onClick={() => router.push(`/admin/forms/${form._id}`)}>
                                    <td>{form.name}</td>
                                    <Box component='td'>
                                        <Tooltip withArrow label={dayjs(form.createdAt).format('DD/MM/YYYY, HH:mm')} transition='fade' transitionDuration={200}>
                                            {/* @ts-ignore */}
                                            {`${dayjs(form.createdAt).fromNow(true)} ${t("random.ago")}`}
                                        </Tooltip>
                                    </Box>
                                    <Box component='td'>
                                        <Tooltip withArrow label={dayjs(form.updatedAt).format('DD/MM/YYYY, HH:mm')} transition='fade' transitionDuration={200}>
                                            {/* @ts-ignore */}
                                            {`${dayjs(form.updatedAt).fromNow(true)} ${t("random.ago")}`}
                                        </Tooltip>
                                    </Box>
                                </Box>
                            )))
                        }
                    </tbody>
                </Table>
                <Box sx={{ margin: '1rem'}}>
                    <Button variant="outline" radius='xl' leftIcon={<FaPlus/>} onClick={createNewForm} disabled={isSubmitting}>{t("forms.create")}</Button>
                </Box>
            </Box>
        </>
    )
}