import { deleteCurrentUser } from "../libs/userInfo"

export default async function resolve(promise){
    const resolved = {
        data: null,
        error: null,
        status: null,
    }
    try{
        const { data } = await promise
        resolved.status = data.status
        resolved.data = data.body
        if(data.error) resolved.error = data.error

        if(data.error.status === 401) deleteCurrentUser()
    }catch(e){
        resolved.error = e.response.data
    }
    return resolved
}
