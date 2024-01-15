import { ActionIcon, Menu, Text } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import User from "../../../../types/user";
import EditRoleModal from "./EditRoleModal";

export default function ProfileMenu({ user }: { user: User }) {

    const [visibleModal, setVisibleModal] = useState<any>(null);

    const { t } = useTranslation('common')

    return (
        <>
            <Menu transition="pop" withArrow placement="end" control={<ActionIcon size={35} color='blue'><BsThreeDotsVertical size={25}/></ActionIcon>}>
                <Menu.Item icon={<FiEdit size={16} />} onClick={() => setVisibleModal('editrole')}>
                    <Text weight={500} size="sm">{t("user.menu.change-role")}</Text>
                </Menu.Item>
                <Menu.Item disabled icon={<FaRegTrashAlt size={16} />} color='red'>
                    <Text weight={500} size="sm">{t("user.menu.delete-user")}</Text>
                </Menu.Item>
            </Menu>
            <EditRoleModal user={user} isVisible={visibleModal == 'editrole'} setVisible={setVisibleModal}/>
        </>
    )
}