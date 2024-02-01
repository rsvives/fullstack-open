import './NotificationToast.css'
const NotificationToast = ({ message, status }) => {
  return (
        <div className={`toast ${status}`}>{message}</div>
  )
}
export default NotificationToast
