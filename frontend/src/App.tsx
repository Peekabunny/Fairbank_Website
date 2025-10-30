import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

import { SessionsContextProvider } from './context/SessionContext';

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          {/* Always redirect root to /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login Page */}
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/home" />} 
          />

          {/* Signup Page */}
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/home" />} 
          />

          {/* Protected Home Page */}
          <Route 
            path="/home" 
            element={
              user ? (
                <SessionsContextProvider>
                  <Home />
                </SessionsContextProvider>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
