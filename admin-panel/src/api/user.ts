import callEndpoint from "../helpers/callEndpoint"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchAllUsers = async () => {
    try {
        const res: any = await callEndpoint(SERVER_URL, `/admin/users`, "GET", {})
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }
    } catch (error) {
        // console.log(error)
        return { success: false }
    }
}


