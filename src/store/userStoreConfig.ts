import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IConfigUser {
    id: number
    theme: string,
    language: string;
}

interface IUserInfoStore {
    userConfig: IConfigUser;
    setUserConfig: (userConfig: IConfigUser) => void;
    cleanUserConfig: () => void;
}

export const useUserInfoStore = create<IUserInfoStore>()(
    persist(
        set => ({
            userConfig: {
                id: 0,
                theme: "",
                language: "",
            },
            setUserConfig: userConfig => set({ userConfig }),
            cleanUserConfig: () =>
                set({
                    userConfig: {
                        id: 0,
                        theme: "",
                        language: "",
                    } as IConfigUser,
                }),
        }),
        {
            name: "userConfig",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
);
