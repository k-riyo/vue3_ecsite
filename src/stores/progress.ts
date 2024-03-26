import { defineStore } from 'pinia'

export const useProgressStore = defineStore({
    id: 'progress',
    state: () => ({
        progressCount: 0
    }),
    getters: {
        isProgress: (state): boolean => state.progressCount > 0
    },
    actions: {
        start(): void {
            this.progressCount++
        },
        end(): void {
            if (this.progressCount > 0) this.progressCount--
        }
    }
})

