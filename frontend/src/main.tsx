import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom' 
import { Toaster } from 'react-hot-toast'

// ... imports
import { AuthContextProvider } from './context/AuthContext';
// --- 1. IMPORT THE SESSIONS PROVIDER ---
import { SessionsContextProvider } from './context/SessionContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SessionsContextProvider>
          <App />
          <Toaster />
        </SessionsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);