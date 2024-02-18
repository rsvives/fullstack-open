// import { useSelector } from 'react-redux'

const UserDetails = ({ user }) => {
  //   const users = useSelector(({ users }) => users)
  //   const user = users.find((u) => u.id === id)
  if (!user) return null
  const { name, username, blogList } = user
  return (
    <>
      <header>
        <h2>{name} details: </h2>
        <span>@{username}</span>
      </header>
      <section>
        <h3>Blogs:</h3>
        <ul>
          {blogList.map((b) => (
            <li key={b.title}>{b.title}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
export default UserDetails
