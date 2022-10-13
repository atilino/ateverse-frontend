export const resultHandler = (response, callback) => {
    if (response.error) throw Error(response.error)
    else callback(response.data)
}