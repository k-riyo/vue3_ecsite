import { useProgress } from "@/composables/Progress";
import { onMounted, onUnmounted } from "vue";

const progress = useProgress()

export const useMount = () => {
    const mounted = async (func: any) => {
        onMounted(async () => {
            try {
                await func()
            } finally {
                progress.progressEnd()
            }
        })
    }

    const unMounted = async (func: any) => {
        onUnmounted(async () => {
            try {
                await func()
            } finally {
                progress.progressStart()
            }
        })
    }

    return {
        mounted, unMounted
    }
}