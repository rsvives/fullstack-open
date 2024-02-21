import { useDispatch } from 'react-redux'
import { loggoutUser } from '../reducers/loggedUserReducer'

const LogoutButton = ({ text = 'logout' }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(loggoutUser())
  }
  return (
    <button className="btn btn-white-outlined" onClick={handleLogout}>
      {text}
    </button>
  )
}
export default LogoutButton
