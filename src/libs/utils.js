export const formatDate = (date, config="date") => {
    let convertedDate
    if(config === "date") convertedDate = new Date(date).toLocaleDateString()
    if(config === "time") convertedDate = new Date(date).toLocaleTimeString()
    if(config === "dateTime") convertedDate = new Date(date).toLocaleString()


    return convertedDate.split('/').map(segment => {
        if(segment < 10) {
            return '0' + segment
        }
        return segment
    }).join('/')
}

export const formatTable = (data) => {
    if (data.length) {
        return data.map(element => {
            let { password, ...item } = element
            return (
                {
                    ...item,
                    key: item._id
                }
            )
        })
    }
    else return []
}