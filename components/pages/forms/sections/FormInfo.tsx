import { TextInput, Box } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Form from "../../../types/form";

export default function FormInfo({ form, setForm }: { form: Form, setForm: (form: Form) => void }) {

    const { t } = useTranslation('common')

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <TextInput label={t("form.sections.info.name.label")} description={t("form.sections.info.name.description")} placeholder="Supporter" required sx={{ flexGrow: 1 }} id={'formName'} 
                value={form.name || ''}
                onChange={(event) => setForm({...form, name: event.target.value})}
            />
            <TextInput label={t("form.sections.info.icon.label")} description={t("form.sections.info.icon.description")} placeholder="fa-solid fa-handshake-angle" sx={{flexGrow: 1}} id={'formicon'} 
                value={form.icon || ''}
                onChange={(event) => setForm({...form, icon: event.target.value})}
            />
        </Box>
    )
}