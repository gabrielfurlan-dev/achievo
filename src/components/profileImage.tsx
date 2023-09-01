import { useUserInfoStore } from "@/store/userStoreInfo";
import { useState } from "react";

interface profileImageProps {
    rounded?: boolean
}

export function ProfileImage({ rounded }: profileImageProps) {
    const { userInfo, setUserInfo } = useUserInfoStore();

    const [isEditing, setIsEditing] = useState(false);
    const [newImageURL, setNewImageURL] = useState("");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewImageURL("");
    };

    const handleSaveClick = () => {
        if (newImageURL) {
            setIsEditing(false);
            // setUserInfo({imageURL: newImageURL})
            setNewImageURL("");
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newImageURL}
                        onChange={e => setNewImageURL(e.target.value)}
                        placeholder="Insira a URL da nova imagem"
                    />
                    <button onClick={handleSaveClick}>Salvar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </>
            ) : (
                <>
                    <img
                        className="w-full h-full"
                        src={userInfo.imageURL}
                        alt="Imagem de perfil"
                        style={{borderRadius: rounded ? "100%" : "0px"}}
                    />
                    {/* <button onClick={handleEditClick}>Editar</button> */}
                </>
            )}
        </div>
    );
}
