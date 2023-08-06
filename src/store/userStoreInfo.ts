import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface IUserInfo {
    registered?: boolean

    id: number,
    name?: string,
    email?: string,
    imageURL?: string,
    description?: string,
    username?: string,

    followers?: number,
    folloing?: number,
}

interface IUserInfoStore {
    userInfo: IUserInfo,
    setUserInfo: (userInfo: IUserInfo) => void,
    cleanUserInfo: () => void
}

export const useUserInfoStore = create<IUserInfoStore>()(
    persist(
        (set) => ({
            userInfo: {
                id: 0,
                registered: false,
                name: '',
                description: '',
                email: '',
                imageURL: '',
                username: '',
            },
            setUserInfo: (userInfo) => set({ userInfo }),
            cleanUserInfo: () => set({ userInfo: { description: "", email: "", imageURL: "", name: "", username: "" } as IUserInfo })
        }),
        {
            name: "userInfo",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
)
