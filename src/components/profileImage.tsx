import { useUserInfoStore } from "@/store/userStoreInfo";
import { useState } from "react";

export function ProfileImage() {
    const { userInfo, setUserInfo } = useUserInfoStore()

    const [isEditing, setIsEditing] = useState(false);
    const [newImageURL, setNewImageURL] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewImageURL('');
    };

    const handleSaveClick = () => {
        if (newImageURL) {

            setIsEditing(false);

            setUserInfo({imageURL: newImageURL})

            setNewImageURL('');
        }
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newImageURL}
                        onChange={(e) => setNewImageURL(e.target.value)}
                        placeholder="Insira a URL da nova imagem"
                    />
                    <button onClick={handleSaveClick}>Salvar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </>
            ) : (
                <>
                    <img src={userInfo.imageURL} alt="Imagem de perfil" />
                    {/* <button onClick={handleEditClick}>Editar</button> */}
                </>
            )}
        </div>
    )
}
