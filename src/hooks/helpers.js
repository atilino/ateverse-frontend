export const resultHandler = (response, callback) => {
    if (response.error) throw Error(response.error.body)
    else callback(response.data)
}
