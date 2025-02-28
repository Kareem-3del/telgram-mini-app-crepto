import callEndpoint from "../helpers/callEndpoint"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchUser = async (chatId: number, token: string,) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/user/${chatId}`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const fetchReferrals = async (chatId: number, token: string,) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/user/referrals/${chatId}`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const updateBalance = async (chatId: number, balance:number, token: string,) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/user/updateBalance/${chatId}`, "POST", {balance}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const saveWallet = async (chatId: number, walletAddress:string, token: string,) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/user/saveWallet/${chatId}`, "POST", {walletAddress}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}