import { useSelector, useDispatch } from 'react-redux'
import { XCircle } from '@phosphor-icons/react'

import PropTypes from 'prop-types'
import { setMessage } from '../reducers/notificationReducer'

const NotificationToast = () => {
  const notification = useSelector(({ notification }) => notification)
  const dispatch = useDispatch()

  const { status, message } = notification
  if (!message) return null

  const dismiss = async () => {
    await dispatch(setMessage(''))
  }
  return (
    <div className={`toast ${status}`}>
      <p>{message}</p>
      <button onClick={dismiss}>
        <XCircle size={32} />
      </button>
    </div>
  )
}

NotificationToast.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf(['success', 'error'])
}
export default NotificationToast
