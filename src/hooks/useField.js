import { useState } from 'react'

const useField = ({ type='text', defaultValue = '' }) => {

    const [value, setValue] = useState(defaultValue)

    const onChange = event => {
        setValue(event.target?.value? event.target.value : event.target?.checked !== undefined? event.target.checked : event)
    }

    return {
        value,
        type,
        onChange
    }
}

export default useField
