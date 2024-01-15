import { Badge, Sx } from "@mantine/core";
import { useTranslation } from "next-i18next";

export default function StatusBadge({ status, sx }: { status?: string, sx?: Sx }){

    const { t } = useTranslation('common')

    switch(status) {
        case 'accepted':
            return <Badge color="green" sx={[sx]}>{t("elements.status.accepted")}</Badge>
        case 'rejected':
            return <Badge color="red" sx={[sx]}>{t("elements.status.rejected")}</Badge>
        case 'pending':
        default:
            return <Badge color="orange" sx={[sx]}>{t("elements.status.pending")}</Badge>
    }
}