import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersPage = ({ title = 'Users Page' }) => {
  const users = useSelector(({ users }) => users)
  console.log('users', users)
  return (
    <div className="flex flex-col mx-auto w-full">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <table cellSpacing={0} cellPadding={12}>
        <thead className="text-left">
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr
                key={u.username}
                className="hover:bg-gray-200 divide-y divide-gray-100"
              >
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogList.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default UsersPage
