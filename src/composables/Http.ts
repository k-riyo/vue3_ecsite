import axios from "axios";
import { goToErrorPage, goToSessionExpire } from "@/router";

export interface HttpResponse<T> {
    data: T
    status: number
}

export interface ServerErrorData {
    message: string
    validationResponse: {
        fieldErrors: object
    }
}

export interface HttpError {
    response: HttpResponse<ServerErrorData>
}

const isHttpError = (error: any): error is HttpError => {
    return axios.isAxiosError(error)
}

export type ErrorHandler = (error: HttpError) => void
export type ErrorHandlers = Map<number, ErrorHandler>

const defaultErrorHandlers = new Map<number, ErrorHandler>([
    [401, () => goToSessionExpire()],
    [403, () => goToErrorPage('閲覧権限がありません', 403)],
    [404, () => goToErrorPage('リクエストが不正です', 404)],
    [500, () => goToErrorPage('システムエラーが発生しました', 500)],
    [503, () => goToErrorPage('ただいまメンテナンス中です。\nメンテナンス終了までしばらくお待ちください', 503)],
])

const templateErrorHandlers = (errorHandlers?: Map<number, ErrorHandler>) => (error: any) => {
    if (!isHttpError(error)) throw error
    if (error.response === undefined) throw error

    const specificErrorHandlers = errorHandlers === undefined ? new Map<number, ErrorHandler>() : errorHandlers
    const handler = new Map([...defaultErrorHandlers, ...specificErrorHandlers]).get(error.response.status)

    if (handler) {
        return handler(error)
    } else {
        goToErrorPage(error.response.data.message, error.response.status)
    }
}

export const useHttp = () => {
    const http = axios.create()
    http.interceptors.request.use((config) => {
        config.withCredentials = true
        config.headers["Content-Type"] = 'application/json'
        return config
    })

    return {
        get: <ReturnDataType>(url: string, params?: any, errorHandlers?: ErrorHandlers): Promise<HttpResponse<ReturnDataType> | void> => {
            return http.get<ReturnDataType>(url, params).catch(templateErrorHandlers(errorHandlers))
        },
        post: <PostDataType, ReturnDataType>(url: string, data: PostDataType, errorHandlers?: ErrorHandlers): Promise<HttpResponse<ReturnDataType> | void> => {
            return http.post<ReturnDataType, HttpResponse<ReturnDataType>, PostDataType>(url, data).catch(templateErrorHandlers(errorHandlers))
        },
        put: <PutDataType, ReturnDataType>(url: string, data: PutDataType, errorHandlers?: ErrorHandlers): Promise<HttpResponse<ReturnDataType> | void> => {
            return http.put<ReturnDataType, HttpResponse<ReturnDataType>, PutDataType>(url, data).catch(templateErrorHandlers(errorHandlers))
        },
        delete: <ReturnDataType>(url: string, errorHandlers?: ErrorHandlers): Promise<HttpResponse<ReturnDataType> | void> => {
            return http.delete<ReturnDataType>(url).catch(templateErrorHandlers(errorHandlers))
        },
    }
}