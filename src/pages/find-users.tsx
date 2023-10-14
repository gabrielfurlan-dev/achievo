import { CompactNavBar } from "@/layouts/NavBar/CompactNavBar";
import PageLayout from "@/layouts/PageLayout";

export default function findUser() {
    return (
        <PageLayout>
            <CompactNavBar title="Amigos" />
            <div>
                <div>
                    <div id="search">

                    </div>
                    <div id="filters">

                    </div>
                </div>

                <div id="users">

                </div>
            </div>
        </PageLayout>
    );
}
