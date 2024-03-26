import { defineStore } from 'pinia'

export type アカウント型 = {
    アカウントid: string
    アカウント名: string | null
}

export const useSessionStore = defineStore({
    id: 'session',
    state: (): {
        アカウント: アカウント型
    } => ({
        アカウント: {
            アカウントid: '',
            アカウント名: '',
        }
    }),
    getters: {
        getアカウントid: (state): string => state.アカウント.アカウントid,
        getアカウント: (state): アカウント型 => state.アカウント,
        ログイン済みである: (state): boolean => state.アカウント.アカウントid !== ''
    },
    actions: {
        setアカウント(account: アカウント型) {
            this.アカウント = account
        },
        ログインアカウントである(アカウントid: string): boolean {
            return this.アカウント.アカウントid === アカウントid
        }
    }
})

