import { useProgressStore } from "@/stores/progress";

export const useProgress = () => {
    const progress = (func: any) => {
        return async () => {
            useProgressStore().start()
            try {
                await func()
            } finally {
                useProgressStore().end()
            }
        }
    }

    const progressStart = () => {
        useProgressStore().start()
    }

    const progressEnd = () => {
        useProgressStore().end()
    }

    return {
        progress, progressStart, progressEnd
    }
}