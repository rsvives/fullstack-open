import './Notification.css'

const Notification = ({ notification }) => {
  const { message, status } = notification
  if (message === null) return null

  return <div className={status}>{message}</div>
}
export default Notification
