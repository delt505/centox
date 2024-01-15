import { Badge } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import getRoles from "../api/roles/getRoles";

export default function RoleBadge({ role }: { role: string | undefined }){

    const { t } = useTranslation('common')

    const { isLoading, isError, data: roles } = useQuery('roles', getRoles)
    if(isLoading || isError || !roles) return <Badge color="gray">{t("random.loading")}</Badge>

    const label = role ? roles[role]?.label : t("elements.role.default");
    const color = role ? roles[role]?.color : "grey";

    return (
        <Badge color={color} size='md'>{label}</Badge>
    )
}