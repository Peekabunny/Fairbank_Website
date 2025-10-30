import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/">
          <h1 className="text-2xl font-bold">TutorBooker</h1>
        </Link>
        <nav className="flex items-center">
          {user && (
            <button
              onClick={handleClick}
              className="bg-white text-green-600 border-2 border-green-600 px-3 py-1 rounded font-poppins text-sm hover:bg-green-600 hover:text-white transition-colors"
            >
              Log out
            </button>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="ml-3 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-3 hover:text-blue-600 transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
