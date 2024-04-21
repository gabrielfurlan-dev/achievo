import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import PageLayout from "@/layouts/PageLayout";
import { UpdateUserLayout } from "@/layouts/UpdateUserLayout";
import { useUserInfoStore } from "@/store/userStoreInfo";

export default function pages() {
    const { userInfo } = useUserInfoStore()
    return (
        <PageLayout pageName="Update Profile">
            <CompactNavBar goBackUrl={"/profile/" + userInfo.id} title="Editar perfil" subTitle="" />
            <UpdateUserLayout destinationPathOnUpdate="/home" />
        </PageLayout>
    );
}
