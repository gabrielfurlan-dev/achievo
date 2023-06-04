import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
    //     function saveUsersData(session: Session) {
    //         const data = session?.user;
    //         localStorage.setItem("Name", data.user_metadata.name);
    //         localStorage.setItem("Email", String(data.email));
    //         localStorage.setItem("Photo", data.user_metadata.avatar_url);
    //     }
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            router.push('/login')

            // const {
            //     data: { session },
            // } = await supabase.auth.getSession();

            // if (!session) {
            //     router.push("/login");
            //     return;
            // }
            // saveUsersData(session);
            // router.push("/home");
        }
        fetchData();
    }, []);

};
