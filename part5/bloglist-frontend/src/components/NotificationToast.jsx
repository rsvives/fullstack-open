import './NotificationToast.css'
const NotificationToast = ({ message, status }) => {
  // const style = {
  //   toast: {
  //     padding: 12,
  //     display: 'flex',
  //     border: 1,
  //     color: 'blue'
  //   },
  //   error: {
  //     border: 'red',
  //     color: 'red'
  //   }
  // }
  return (
        <div className={`toast ${status}`}>{message}</div>
  )
}
export default NotificationToast
