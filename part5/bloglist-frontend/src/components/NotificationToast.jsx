import './NotificationToast.css'
import PropTypes from 'prop-types'

const NotificationToast = ({ message, status }) => {
  return (
        <div className={`toast ${status}`}>{message}</div>
  )
}

NotificationToast.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf(['success', 'error'])
}
export default NotificationToast
