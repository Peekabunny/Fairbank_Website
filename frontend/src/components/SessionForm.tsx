import { useState, useEffect } from "react";
import { useSessionsContext } from "../hooks/useSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import type { Session } from "../context/SessionContext";

interface SessionFormProps {
  sessionToEdit?: Session | null;
  onEditComplete?: () => void;
}

const SessionForm = ({ sessionToEdit, onEditComplete }: SessionFormProps) => {
  const { dispatch } = useSessionsContext();
  const { user } = useAuthContext();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tutor, setTutor] = useState("");
  const [startTime, setStartTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  // Populate form when editing
  useEffect(() => {
    if (sessionToEdit) {
      setSubject(sessionToEdit.subject);
      setDescription(sessionToEdit.description);
      setTutor(sessionToEdit.tutor);

      // Convert ISO string to datetime-local format
      const date = new Date(sessionToEdit.startTime);
      const localDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);
      setStartTime(localDateTime);
    } else {
      setSubject("");
      setDescription("");
      setTutor("");
      setStartTime("");
    }
  }, [sessionToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const session = { subject, description, tutor, startTime };

    const isUpdating = !!sessionToEdit;
    const url = isUpdating
      ? `/api/sessions/${sessionToEdit._id}`
      : "/api/sessions";
    const method = isUpdating ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
      return;
    }

    // Reset form
    setSubject("");
    setDescription("");
    setTutor("");
    setStartTime("");
    setError(null);
    setEmptyFields([]);

    if (isUpdating) {
      dispatch({ type: "UPDATE_SESSION", payload: json });
      onEditComplete?.();
    } else {
      dispatch({ type: "CREATE_SESSION", payload: json });
    }
  };

  const handleCancel = () => {
    setSubject("");
    setDescription("");
    setTutor("");
    setStartTime("");
    setError(null);
    setEmptyFields([]);
    onEditComplete?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-xl p-6 space-y-4 border border-base-300"
    >
      <h3 className="text-xl font-semibold">
        {sessionToEdit ? "Edit Session" : "Add a New Session"}
      </h3>

      {/* Subject */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Subject</span>
        </label>
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`input input-bordered w-full ${
            emptyFields.includes("subject") ? "input-error" : ""
          }`}
          required
        />
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Description</span>
        </label>
        <textarea
          placeholder="Enter session details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`textarea textarea-bordered w-full ${
            emptyFields.includes("description") ? "textarea-error" : ""
          }`}
          rows={3}
          required
        ></textarea>
      </div>

      {/* Tutor */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Tutor</span>
        </label>
        <input
          type="text"
          placeholder="Enter tutor name"
          value={tutor}
          onChange={(e) => setTutor(e.target.value)}
          className={`input input-bordered w-full ${
            emptyFields.includes("tutor") ? "input-error" : ""
          }`}
          required
        />
      </div>

      {/* Start Time */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Start Time</span>
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className={`input input-bordered w-full ${
            emptyFields.includes("startTime") ? "input-error" : ""
          }`}
          required
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error py-2">
          <span>{error}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <button type="submit" className="btn btn-primary">
          {sessionToEdit ? "Update Session" : "Add Session"}
        </button>
        {sessionToEdit && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-outline btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default SessionForm;
