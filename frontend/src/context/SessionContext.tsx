import { createContext, useReducer } from 'react';

import type { ReactNode } from 'react';

export interface Attendee {
  _id: string;
  email: string;
}


export interface Session {
  _id: string;
  subject: string;
  description: string;
  tutor: string;
  startTime: string;
  attendees?: Attendee[]; 
  createdAt?: string;
  updatedAt?: string;
}

interface SessionsState {
  sessions: Session[]; 
}


type SessionsAction =
  | { type: 'SET_SESSIONS'; payload: Session[] }
  | { type: 'CREATE_SESSION'; payload: Session }
  | { type: 'DELETE_SESSION'; payload: { _id: string } } 
  | { type: 'UPDATE_SESSION'; payload: Session };     


interface SessionsContextType extends SessionsState {
  dispatch: React.Dispatch<SessionsAction>;
}


export const SessionsContext = createContext<SessionsContextType | null>(null);


export const sessionsReducer = (state: SessionsState, action: SessionsAction): SessionsState => {
  switch (action.type) {
    case 'SET_SESSIONS':
      return { sessions: action.payload };

    case 'CREATE_SESSION':
 
      return { sessions: [action.payload, ...state.sessions] };

    case 'DELETE_SESSION':
     
      return {
        sessions: state.sessions.filter((s) => s._id !== action.payload._id),
      };

    case 'UPDATE_SESSION':
     
      return {
        sessions: state.sessions.map((session) =>
          session._id === action.payload._id ? action.payload : session
        ),
      };

    default:
      return state;
  }
};


type SessionsContextProviderProps = {
  children: ReactNode;
};

export const SessionsContextProvider = ({ children }: SessionsContextProviderProps) => {
  const [state, dispatch] = useReducer(sessionsReducer, {
    
    sessions: [],
  });

  return (
    <SessionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SessionsContext.Provider>
  );
};