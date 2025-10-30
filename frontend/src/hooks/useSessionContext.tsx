import { SessionsContext } from '../context/SessionContext.tsx';
import { useContext } from 'react';

export const useSessionsContext = () => {
  const context = useContext(SessionsContext);

  if (!context) {
    throw Error('useSessionsContext must be used inside a SessionsContextProvider');
  }

  return context;
};