import { Menu, Button, Text } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { BiHeading } from "react-icons/bi";
import { BsParagraph } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { GrTextAlignLeft } from "react-icons/gr";
import { MdShortText, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { TbSelect } from "react-icons/tb";
import FormField from "../../../../types/formField";

export default function AddFieldButton({ handleAddField }: { handleAddField: (type: FormField['type']) => void }) {
    
    const { t } = useTranslation('common')

    return (
        <Menu control={<Button color='primary' leftIcon={<FaPlus/>}>{t("form.sections.fields.add.button")}</Button>} position='top'>
            <Menu.Label>{t("form.sections.fields.add.content")}</Menu.Label>
            <Menu.Item icon={<BsParagraph/>} onClick={() => handleAddField('text')}>
                <Text weight={600}>{t("form.sections.fields.add.text")}</Text>
            </Menu.Item>
            <Menu.Item icon={<BiHeading/>} onClick={() => handleAddField('heading')}>
                <Text weight={600}>{t("form.sections.fields.add.heading")}</Text>
            </Menu.Item>

            <Menu.Label>{t("form.sections.fields.add.input")}</Menu.Label>
            <Menu.Item icon={<MdShortText/>} onClick={() => handleAddField('shorttext')}>
                <Text weight={600}>{t("form.sections.fields.add.shorttext")}</Text>
            </Menu.Item>
            <Menu.Item icon={<GrTextAlignLeft/>} onClick={() => handleAddField('longtext')}>
                <Text weight={600}>{t("form.sections.fields.add.longtext")}</Text>
            </Menu.Item>
            <Menu.Item icon={<MdOutlineArrowDropDownCircle/>} disabled>
                <Text weight={600}>{t("form.sections.fields.add.select")}</Text>
            </Menu.Item>
            <Menu.Item icon={<TbSelect/>} onClick={() => handleAddField('checkbox')}>
                <Text weight={600}>{t("form.sections.fields.add.checkbox")}</Text>
            </Menu.Item>
        </Menu>   
    )
}