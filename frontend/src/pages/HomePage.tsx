import { useEffect, useState } from "react";
import { useSessionsContext } from "../hooks/useSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import type { Session } from "../context/SessionContext";

// components
import SessionDetails from "../components/SessionDetails";
import SessionForm from "../components/SessionForm";

const Home = () => {
  const { sessions, dispatch } = useSessionsContext();
  const { user } = useAuthContext();
  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      // Ensure user and user.token exist before fetching
      if (user?.token) {
        const response = await fetch("/api/sessions", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_SESSIONS", payload: json });
        }
      }
    };

    fetchSessions();
  }, [dispatch, user]);

  // Handler when admin clicks edit button
  const handleEditClick = (session: Session) => {

    console.log("2. RECEIVED in HomePage. Setting sessionToEdit to:", session._id);
    setSessionToEdit(session);

    setSessionToEdit(session);
    // Scroll to form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler when edit is completed or cancelled
  const handleEditComplete = () => {
    setSessionToEdit(null);
  };

  return (
    <div className="home max-w-7xl mx-auto p-6 grid gap-8 md:grid-cols-3">
      {/* Sessions list */}
      <div className="sessions md:col-span-2 space-y-4">
        {sessions && sessions.length > 0 ? (
          sessions.map((session: Session) => (
            <SessionDetails 
              key={session._id} 
              session={session}
              onEditClick={handleEditClick}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No sessions available yet.</p>
        )}
      </div>

      {/* Session form */}
      <div>
        {user?.role === 'Administrator' && (
          <div className="session-form bg-white p-6 rounded-lg shadow-md">
            <SessionForm 
              sessionToEdit={sessionToEdit}
              onEditComplete={handleEditComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;