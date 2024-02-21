import { useState, forwardRef, useImperativeHandle } from 'react'

/* eslint-disable react/display-name */
const Togglable = forwardRef(
  (
    {
      style = null,
      buttonStyle = null,
      buttonLabel = 'expand',
      closeButtonLabel = 'Cancel',
      ...props
    },
    refs
  ) => {
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => {
      setExpanded(!expanded)
    }

    useImperativeHandle(refs, () => {
      return {
        toggleExpanded
      }
    })

    const buttonClass = expanded ? 'btn-primary-outlined' : 'btn-primary'
    return (
      <>
        {expanded && props.children}
        <button
          className={`btn ${buttonClass}`}
          style={buttonStyle}
          onClick={toggleExpanded}
        >
          {expanded ? closeButtonLabel : buttonLabel}
        </button>
      </>
    )
  }
)

export default Togglable
