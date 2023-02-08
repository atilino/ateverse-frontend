/**
* Check if array contains repeated elements by key
* @param {Array<Object>} items
* @param {string} key
* @returns {boolean}
*/
export const haveRepeatedValueByKey = (items, key) => {
    const notRepeatedValues = []
    const repeatedValues = []

    for (const item of items) {
        if(notRepeatedValues.indexOf(item[key]) === -1) {
            notRepeatedValues.push(item[key])
            continue
        }
        repeatedValues.push(item[key])
        return true
    }
    return false
}