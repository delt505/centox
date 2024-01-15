import { Box, Checkbox, Table } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import getRoles from "../../../api/roles/getRoles";
import RoleBadge from "../../../elements/RoleBadge";
import Form from "../../../types/form";

export default function FormPermissions({ form, setForm }: { form: Form, setForm: (form: Form) => void }) {

    const { t } = useTranslation('common')

    const { isLoading, isError, data } = useQuery('roles', getRoles)
    if(isLoading || isError || !data) return <Box/>

    return (
        <Box>
            <Table>
                <thead>
                    <tr>
                        <th>{t("form.sections.permissions.role")}</th>
                        <th>{t("form.sections.permissions.create")}</th>
                        <th>{t("form.sections.permissions.view")}</th>
                        <th>{t("form.sections.permissions.comment")}</th>
                        <th>{t("form.sections.permissions.status")}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((key, index) => {
                        const role = data[key]
                        const permission = form.permissions[key]
                        return (
                            <tr key={role.id}>
                                <td><RoleBadge role={role.id}/></td>
                                <td><Checkbox checked={permission?.create} onChange={(event) => setForm({...form, permissions: {...form.permissions, [role.id]: {...permission, create: event.target.checked}}})}/></td>
                                <td><Checkbox checked={permission?.viewOthers} onChange={(event) => setForm({...form, permissions: {...form.permissions, [role.id]: {...permission, viewOthers: event.target.checked}}})}/></td>
                                <td><Checkbox checked={permission?.comment} onChange={(event) => setForm({...form, permissions: {...form.permissions, [role.id]: {...permission, comment: event.target.checked}}})}/></td>
                                <td><Checkbox checked={permission?.changeStatus} onChange={(event) => setForm({...form, permissions: {...form.permissions, [role.id]: {...permission, changeStatus: event.target.checked}}})}/></td>
                            </tr>
                    )})}
                </tbody>
            </Table>
        </Box>        
    )
}