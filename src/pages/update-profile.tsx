import { SimpleNavBar } from "@/components/NavBar/SimpleNavBar";
import PageLayout from "@/layouts/PageLayout";
import { UpdateUserLayout } from "@/layouts/UpdateUserLayout";
import { AddressBook } from "phosphor-react";

export default function pages() {
    return (
        <PageLayout>
            <SimpleNavBar IconPage={AddressBook} title="Finalizar Cadastro" subTitle="" />
            <UpdateUserLayout destinationPathOnUpdate="/home" isFinishingRegister />
        </PageLayout>
    );
}
