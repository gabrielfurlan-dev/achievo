import { DefaultProfile } from "@/assets/icons/defaultProfile";
import { useUserInfoStore } from "@/store/userStoreInfo";
import { CircularProgress } from "@mui/material";
import { ImgHTMLAttributes, useState } from "react";

interface profileImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    imageUrl: string | undefined,
    rounded?: boolean,
    size?: number
}

export function ProfileImage({ imageUrl, rounded, size, ...props }: profileImageProps) {
    const { userInfo, setUserInfo } = useUserInfoStore();

    const [isLoading, setIsLoading] = useState(false);
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
            {
                !isLoading ? (
                    <>
                        {
                            isEditing ? (
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
                                <div style={{ height: size ?? 40, width: size ?? 40 }}>
                                    <img
                                        {...props}
                                        className="w-full h-full"
                                        src={imageUrl}
                                        alt="Profile Image"
                                        style={{ borderRadius: rounded ? "100%" : "0px" }}
                                        onError={() => { setIsLoading(true) }}
                                    />
                                    {/*//TODO: validate if image has error*/}
                                    {/* <button onClick={handleEditClick}>Editar</button> */}
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div style={{ height: size ?? 40, width: size ?? 40 }}>
                        <div className="hidden dark:block">
                            <DefaultProfile color="#2C2C2C"  />
                        </div>
                        <div className="block dark:hidden">
                            <DefaultProfile color="#ADB5BD" />
                        </div>
                    </div>
                )
            }

        </div >
    );
}
