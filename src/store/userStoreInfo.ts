import { create } from 'zustand'

export interface IUserInfo {
    name?: string,
    email?: string,
    imageURL?: string,
    description?: string,
    username?: string,

}

interface IUserInfoStore {
    userInfo: IUserInfo,
    setUserInfo: (userInfo: IUserInfo) => void,
    cleanUserInfo: () => void
}

export const useUserInfoStore = create<IUserInfoStore>()((set) => ({
    userInfo: {
        name: '',
        description: '',
        email: '',
        imageURL: '',
        username: '',
    },
    setUserInfo: (userInfo) => set({ userInfo }),
    cleanUserInfo: () => set({ userInfo: { description: "", email: "", imageURL: "", name: "", username: "" } as IUserInfo })
}))
