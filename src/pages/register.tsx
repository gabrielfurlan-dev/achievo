import { ConfirmButton } from "@/components/Buttons";
import { InputField } from "@/components/Inputs/InputField";
import { ProfileImage } from "@/components/profileImage";
import { useState } from "react";
import Swal from "sweetalert2";

export default function pages() {
    // const [username, setUsername] = useState(userInfo.username)
    // const [description, setDescription] = useState(userInfo.description)

    function handleSaveUserInfo() {
        //must implement method to validate user already exists

        // if (username == "" || description == "") {
        //     Swal.fire('Dados inválidos', 'É necessário preencher os campos corretamente.', "error")
        //     return;
        // }

        // setUserInfo((info) => ({
        //     ...info,
        //     username: username,
        //     description: description
        // }))

        Swal.fire("Good Job!", "Dados atualizados com sucesso", "success");
    }

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center ">
            {/* <div className="gap-4 flex flex-col w-3/4 md:w-4/6 lg:w-5/12">
                <InputField
                    type="text"
                    onChange={setUsername}
                    value={username}
                    placeHolder="@username"
                    label="Nome de Usuário"
                />
                <div className="">
                    <InputField
                        type="textarea"
                        onChange={setDescription}
                        value={description}
                        placeHolder={'Sou um viciado em endorfina e o triathlon é minha droga favorita! Nado, pedalo e corro com alegria contagiante. O rei do triathlon, misturando suor, risadas e uma dose extra de aventura! 🏆😄'}
                        label="Descrição"
                    />
                </div>
                <div className="flex w-full justify-end">
                    <div><ConfirmButton onClick={handleSaveUserInfo}>Salvar</ConfirmButton></div>
                </div>
            </div>
            <div>
                <ProfileImage/>
            </div> */}
        </div>
    );
}
