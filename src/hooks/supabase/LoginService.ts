import Swal from 'sweetalert2';
import { createClient } from "@supabase/supabase-js";

import env from "variables";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export async function handleLoginGoogle() {
    // const prisma = new PrismaClient();

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });

        console.log("PASSOU AQUI")


        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session) {
            const userData = session.user;

            console.log({
                data: {
                    userEmail: userData.user_metadata.name,
                    userName: String(userData.email),
                    imageURL: userData.user_metadata.avatar_url,
                }
            })

            return {
                success: true,
                message: "Dados de login obtidos com sucesso",
                data: {
                    userEmail: userData.user_metadata.name,
                    userName: String(userData.email),
                    imageURL: userData.user_metadata.avatar_url,
                }
            };
        } else {
            return {
                sucess: false,
                message: "Não foi possível fazer login com o Goole.",
                data: {
                    userEmail: null,
                    userName: null,
                    imageURL: null
                }
            };
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocorreu um erro ao fazer login com o Google!',
        });
        return {
            sucess: false,
            message: "Não foi possível fazer login com o Goole.",
            data: {
                userEmail: null,
                userName: null,
                imageURL: null
            }
        };
    }
}

export async function handleSignOut(){
    const {error} = await supabase.auth.signOut()
}
