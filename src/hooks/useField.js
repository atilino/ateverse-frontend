import { useState } from 'react'

const useField = ({ type='text', defaultValue = '' }) => {

    const [value, setValue] = useState(defaultValue)

    const onChange = event => {
        setValue(event.target? event.target.value : event)
    }

    return {
        value,
        type,
        onChange
    }
}

export default useField
