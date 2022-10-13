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

export const filterUndefined = (array) => array.filter(item => typeof item !== 'undefined')