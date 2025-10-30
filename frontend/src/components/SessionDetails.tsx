import { useSessionsContext } from "../hooks/useSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns";
import type { Session } from "../context/SessionContext";

interface Props {
  session: Session;
  onEditClick?: (session: Session) => void;
}

const SessionDetails = ({ session, onEditClick }: Props) => {
  const { dispatch } = useSessionsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch(`/api/sessions/${session._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_SESSION", payload: { _id: session._id } });
    }
  };

  const handleBook = async () => {
    console.log("handleBook function CALLED for session:", session._id);
    if (!user) {
      console.error("User not found, cannot book.");
      return;
    }

    try {
      const response = await fetch(`/api/sessions/${session._id}/book`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "UPDATE_SESSION", payload: json });
      } else {
        console.error("Failed to book session:", json.message);
      }
    } catch (error) {
      console.error("Error booking session:", error);
    }
  };

  const handleCancel = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/sessions/${session._id}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "UPDATE_SESSION", payload: json });
      } else {
        console.error("Failed to cancel booking:", json.message);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const isBooked =
    user && session.attendees?.some((attendee) => attendee._id === user._id);

  return (
    <div className="session-details bg-white rounded-lg shadow-md my-5 p-6 relative transition hover:shadow-lg border border-gray-100 flex flex-col">
      <div className="flex-grow">
        <h4 className="text-xl font-semibold text-primary mb-2">
          {session.subject}
        </h4>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Description: </strong>
          {session.description}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Tutor: </strong>
          {session.tutor}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Start Time: </strong>
          {new Date(session.startTime).toLocaleString()}
        </p>

        {user?.role === "Administrator" && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-bold text-sm text-gray-800">
              Booked Students ({session.attendees?.length || 0}):
            </h5>
            {session.attendees && session.attendees.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                {session.attendees.map((attendee) => (
                  <li key={attendee._id}>{attendee.email}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic mt-1">
                No students have booked this session yet.
              </p>
            )}
          </div>
        )}

        {session.createdAt && (
          <p className="text-xs text-gray-500 mt-2 italic">
            {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
          </p>
        )}
      </div>


      <div className="mt-4">
        {user?.role === "Standard" &&
          (isBooked ? (
            <button
              onClick={handleCancel}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Cancel Booking
            </button>
          ) : (
            <button
              onClick={handleBook}
              className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Book Session
            </button>
          ))}
      </div>

      {user?.role === "Administrator" && (
        <div className="absolute top-4 right-4 flex gap-2">
       
          <button
            onClick={() => onEditClick?.(session)}
            className="btn btn-square btn-sm btn-outline btn-primary hover:scale-110 transition-transform"
            title="Edit session"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="btn btn-square btn-sm btn-outline btn-error hover:scale-110 transition-transform"
            title="Delete session"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionDetails;
