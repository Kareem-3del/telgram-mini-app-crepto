import callEndpoint from "../helpers/callEndpoint"
import { Task } from "../lib/types"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL


export const fetchAllTasks = async () => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/task`, "GET",)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const fetchATask = async (taskId: string) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/ads/${taskId}`, "GET")
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const fetchRules = async () => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/rules`, "GET")
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const updateRules = async (updates: any) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/rules`, "PATCH", { updates })
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const updateATask = async (taskId: string, updateData: any) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/ads/${taskId}`, "PATCH", { updateData })
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const deleteATask = async (taskId: string,) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/ads/${taskId}`, "DELETE",)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const createATask = async (taskDetails:Task) => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/ads/new`, "POST",{...taskDetails})
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}