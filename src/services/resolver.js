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
    }catch(e){
        resolved.error = e.response.data
    }
    return resolved
}