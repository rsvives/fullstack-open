import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const NavMenu = ({ title = 'App', user, links }) => {
  return (
    <header className="p-4 bg-emerald-700 flex justify-between items-center shadow-md relative sticky top-0">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <nav className="text-white absolute bottom-4 right-[50%] ">
        {links.map((l) => (
          <Link key={l.text} to={l.path} className="p-4 hover:opacity-50">
            {l.text}
          </Link>
        ))}
      </nav>
      {user && (
        <div>
          <span className="mr-4 text-emerald-400 text-md font-bold">
            {user.name}
          </span>
          <LogoutButton />
        </div>
      )}
    </header>
  )
}

export default NavMenu
