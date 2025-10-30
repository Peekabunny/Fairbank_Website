import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

interface User {
  _id: string;
  email: string;
  token: string;
  role: 'Administrator' | 'Standard';
}

interface ApiResponse {
  _id: string;

  email: string;
  token: string;
  role: 'Administrator' | 'Standard';
  error?: string;
}

interface SignupReturn {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useSignup = (): SignupReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const json: ApiResponse = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || 'An unknown error occurred.');
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
        setError('A network error occurred');
      }
    }
  };

  return { signup, isLoading, error };
};