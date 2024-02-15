import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (ev) => {
    setValue(ev.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    input: {
      value,
      type,
      onChange
    },
    reset
  }
}
