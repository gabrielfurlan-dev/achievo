import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import PageLayout from "@/layouts/PageLayout";
import { UpdateUserLayout } from "@/layouts/UpdateUserLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { useRouter } from "next/router";
import { AddressBook } from "phosphor-react";
import { useEffect } from "react";

export default function pages() {
    const { userInfo } = useUserInfoStore()
    const router = useRouter()

    useEffect(() => {
        if (userInfo.alreadyRegistered) {
            router.push("/home")
        }
    }, [userInfo])

    return (
        <PageLayout>
            <SimpleNavBar IconPage={AddressBook} title="Finalizar Cadastro" subTitle="" />
            <UpdateUserLayout destinationPathOnUpdate="/home" isFinishingRegister />
        </PageLayout>
    );
}
