import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(email, password)
    
  }

  return (
    <form
      className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Log In</h3>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Email address</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-gray-700 font-medium">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <button disabled={isLoading}
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-md transition-colors"
      >
        Log In
      </button>
       {error && <div className="=p-2.5 bg-red-100 border border-red-600 text-red-600 rounded mb-5">{error}</div>}
    </form>
  )
}

export default Login
