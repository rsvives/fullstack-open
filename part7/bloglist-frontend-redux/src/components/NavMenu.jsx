import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const NavMenu = ({ title = 'App', user, links }) => {
  const navmenuStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottom: 'solid 1px',
    marginBottom: 24,
  }
  if (!user) {
    return (
      <header style={navmenuStyle}>
        <h1>{title}</h1>
      </header>
    )
  }
  return (
    <header style={navmenuStyle}>
      <h1>{title}</h1>
      <nav>
        {/* {links.map((l) => (
          <Link to={l.to}>{l.text}</Link>
        ))} */}
      </nav>
      <span>
        {user.name} <LogoutButton />
      </span>
    </header>
  )
}

export default NavMenu
