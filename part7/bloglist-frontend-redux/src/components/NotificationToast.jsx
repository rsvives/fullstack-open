import { useSelector } from 'react-redux'
import './NotificationToast.css'
import PropTypes from 'prop-types'

const NotificationToast = () => {
  const notification = useSelector(({ notification }) => notification)
  const { status, message } = notification
  if (!message) return null

  return <div className={`toast ${status}`}>{message}</div>
}

NotificationToast.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf(['success', 'error']),
}
export default NotificationToast
