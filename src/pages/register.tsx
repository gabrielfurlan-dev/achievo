import { InputField } from "@/components/Buttons/InputField";
import { useState } from "react";

export default function pages() {
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center ">
            <div className="gap-4 flex flex-col w-3/4 md:w-4/6 lg:w-5/12">
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
            </div>
            <div>
            </div>
        </div>
    );
}
