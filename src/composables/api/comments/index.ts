import { type ErrorHandlers, useHttp } from "@/composables/Http"

export type コメント登録型 = {
    comment: {
        stringValue: string
    }
}

const http = useHttp()

export const useComments = () => {
    const コメントを登録 = async (postData: コメント登録型, errorHandlers?: ErrorHandlers): Promise<any> => {
        return await http.post(`/api/comments`, postData, errorHandlers)
    }

    return {
        コメントを登録
    }
}