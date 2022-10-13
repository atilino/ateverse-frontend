import accountService from '../services/accounts'
import orderService from '../services/orders'
import deviceService from '../services/devices'
import userService from '../services/users'
import networkService from '../services/networks'
import templateService from '../services/personalities'

export const getData = async (page) => {
    const selector = {
        accounts: () => accountService.getAccounts(),
        orders: () => orderService.getOrders(),
        devices: () => deviceService.getDevices(),
        users: () => userService.getUsers(),
        networks: () => networkService.getNetworks(),
        personalityTemplates: () => templateService.getTemplates()
    }
    const results = await selector[page]()
    if (results.error) return { error: data.error }
    const formated = await format(results.data, page)
    return { data: formated }
}

const format = (data, page) => {
    if (data.length) {
        const convertedData = data.map(async element => {
            let { password, ...item } = element
            if (page === 'devices') {
                return ({
                        ...item,
                        key: item._id,
                        accounts: await showDeviceAccounts(item.imei)
                    }
                )
            }
            else {
                return (
                    {
                        ...item,
                        key: item._id
                    }
                )
            }
        })
        return Promise.all(convertedData)
    }
    else return []
}

const showDeviceAccounts = async (imei) => {

    const result = await getAccountsByImei(imei)
    if (result.error) return []
    return result.data
}