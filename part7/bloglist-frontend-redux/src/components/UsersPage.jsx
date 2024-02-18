import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersPage = ({ title = 'Users Page' }) => {
  const users = useSelector(({ users }) => users)
  console.log('users', users)
  return (
    <>
      <h2>{title}</h2>
      <table cellSpacing={12} cellPadding={20}>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.username}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogList.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default UsersPage
