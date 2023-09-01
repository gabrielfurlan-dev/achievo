import { CompactNavBar } from "@/components/NavBar/CompactNavBar";
import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import PageLayout from "@/layouts/PageLayout";
import { UpdateUserLayout } from "@/layouts/UpdateUserLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { AddressBook } from "phosphor-react";

export default function pages() {
    const { userInfo } = useUserInfoStore()
    return (
        <PageLayout>
            <CompactNavBar goBackUrl={"/profile/" + userInfo.id} IconPage={AddressBook} title="Editar perfil" subTitle="" />
            <UpdateUserLayout destinationPathOnUpdate="/home" isFinishingRegister />
        </PageLayout>
    );
}
