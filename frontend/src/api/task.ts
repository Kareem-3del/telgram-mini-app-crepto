import callEndpoint from "../helpers/callEndpoint"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const createAnAd = async (chatId: number, token: string, adDetails:any) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/task/new`, "POST", {...adDetails, chatId}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const fetchAllTasks = async (chatId: number, token: string, ) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/task`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const doATask = async (chatId: number, token: string,taskId:string ) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/task/do/${taskId}`, "POST", {chatId}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}
