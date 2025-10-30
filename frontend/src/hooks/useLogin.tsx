import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// The User interface (should now include _id)
interface User {
  _id: string;
  email: string;
  token: string;
  role: 'Administrator' | 'Standard';
}

// The ApiResponse interface (should also include _id)
interface ApiResponse {
  _id: string;
  email: string;
  token: string;
  role: 'Administrator' | 'Standard';
  error?: string;
}

// --- THIS IS THE FIX ---
// Add the missing interface definition for the hook's return value.
interface LoginReturn {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// This line will now be valid because LoginReturn is defined
export const useLogin = (): LoginReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json: ApiResponse = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || 'Login failed.');
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json as User });
      
      setIsLoading(false);

    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('A network or unexpected error occurred.');
      }
    }
  };

  return { login, isLoading, error };
};