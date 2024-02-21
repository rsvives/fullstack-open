// import { useSelector } from 'react-redux'

const UserDetails = ({ user }) => {
  //   const users = useSelector(({ users }) => users)
  //   const user = users.find((u) => u.id === id)
  if (!user) return null
  const { name, username, blogList } = user
  return (
    <div className="container card">
      <header className="flex gap-4 items-baseline mb-3">
        <h2 className="text-2xl">{name}</h2>
        <span className="text-sm text-gray-600">@{username}</span>
      </header>
      <section>
        <h3 className="text-lg my-2">Blogs:</h3>
        <ul className="text-gray-600 list-none list-inside">
          {blogList.map((b) => (
            <li key={b.title}>{b.title}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
export default UserDetails
