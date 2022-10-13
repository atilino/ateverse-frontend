export const getProp = (obj, address) => {
    if(obj[address.split(' ')[0]]?.[address.split(' ')[1]]) {
        return obj[address.split(' ')[0]][address.split(' ')[1]]
    }
    return obj[address]
}