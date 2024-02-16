import { useState, forwardRef, useImperativeHandle } from 'react'

/* eslint-disable react/display-name */
const Togglable = forwardRef(({ style = null, buttonStyle = null, buttonLabel = 'expand', closeButtonLabel = 'Cancel', ...props }, refs) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleExpanded
    }
  })

  return (
    <div style={style}>
      {expanded && props.children}
      <button style={buttonStyle} onClick={toggleExpanded}>{expanded ? closeButtonLabel : buttonLabel}</button>
    </div>
  )
})

export default Togglable
