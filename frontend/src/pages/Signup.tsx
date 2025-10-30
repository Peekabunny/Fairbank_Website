import { useState } from 'react';
import { useSignup } from "../hooks/useSignup"; // Adjusted import path for convention

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form
      className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Sign Up
      </h3>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">
          Email address
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className="block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

     
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-md transition-colors disabled:bg-gray-400"
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>

     
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </form>
  );
};

export default Signup;