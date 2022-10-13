import deviceService from "../services/devices"

export const devicesList = async () =>{
    const result = await deviceService.getDevices()
    if(result.error) return []
    else{
        const formated = result.data.map(item => ({ value: item._id, key: item._id, name: item.imei }) )
        return formated
    }
}