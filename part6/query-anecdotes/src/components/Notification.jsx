import { useContext } from 'react'
import NotificationContext, { NOTIFICATION_ACTIONS } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const [notification, dispatch] = useContext(NotificationContext)
  if (!notification) return null
  setTimeout(() => {
    dispatch({ type: NOTIFICATION_ACTIONS.CLEAR })
  }, 3000)
  return (
    <div style={style}>
      {notification}
    </div>

  )
}

export default Notification
