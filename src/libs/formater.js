const select = (data, { label, value }) =>{
    return data.map(item => {
        return {
            value: item[value],
            label: item[label]
        }
    })
}


export default {
    select
}