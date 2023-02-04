import { deleteCurrentUser } from "../libs/userInfo"

export default async function resolve(promise){
    const resolved = {
        data: null,
        error: null,
        status: null,
    }
    try{
        const data = await promise

        if(data === undefined) {
            deleteCurrentUser()
            window.location.reload()
            return resolved
        }

        resolved.status = data.status
        resolved.data = data.body
        if(data.error) resolved.error = data.error
    }catch(e){
        console.log(e)
        resolved.error = e
    }
    return resolved
}
