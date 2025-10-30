import { createContext, useReducer, useEffect } from 'react'
import type { ReactNode, Dispatch } from 'react'
// 1. Define the shape of our User object
// This should match the object you save in localStorage and get from your API
interface User {
  _id: string;
  email: string;
  token: string;
  role: 'Administrator' | 'Standard'; // Use a union type for specific roles
}

// 2. Define the shape of our authentication state
interface AuthState {
  user: User | null;
}

// 3. Define the types for our reducer actions (discriminated union)
type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

// 4. Define the shape of the context value
interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

// Create the context with an initial value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// The reducer function with types for state and action
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// The provider component
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // Check localStorage for a user on initial load
  useEffect(() => {
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user: User = JSON.parse(userJSON);
      // You might add validation here in a real app to ensure the stored user data is valid
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};