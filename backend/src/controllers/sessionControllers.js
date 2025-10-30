import Session from "../models/sessionModel.js";
import mongoose from "mongoose";

//  GET all sessions 
export const getAllSessions = async (req, res) => {
  try {
    
    const sessions = await Session.find({})
      .sort({ startTime: 1 })
      .populate("attendees", "email"); 

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//  GET a single session by id 
export const getSessionById = async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such session" });
  }

  try {
    // Find the session and populate its attendees
    const session = await Session.findById(id).populate("attendees", "email"); 
    if (!session) {
      return res.status(404).json({ error: "No such session" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE a new session (Admin only) 
export const createSession = async (req, res) => {
  const { subject, description, tutor, startTime } = req.body;

  let emptyFields = [];
  if (!subject) emptyFields.push("subject");
  if (!description) emptyFields.push("description");
  if (!tutor) emptyFields.push("tutor");
  if (!startTime) emptyFields.push("startTime");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const newSession = await Session.create({
      subject,
      description,
      tutor,
      startTime,
      user_id,
    });
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a session (Admin only)
export const updateSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such session" });
  }

  // When updating
  const updatedSession = await Session.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  ).populate("attendees", "email");

  if (!updatedSession) {
    return res.status(404).json({ error: "No such session" });
  }

  res.status(200).json(updatedSession);
};

//  DELETE a session (Admin only) 
export const deleteSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such session" });
  }

  try {
    const session = await Session.findByIdAndDelete(id);
    if (!session) {
      return res.status(404).json({ error: "No such session" });
    }
    res
      .status(200)
      .json({
        message: "Session deleted successfully!",
        deletedSession: session,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting session" });
  }
};

// BOOK a session (Student only)
export const bookSession = async (req, res) => {
  try {
    const studentId = req.user._id;

    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { attendees: studentId } },
      { new: true }
    ).populate("attendees", "email");

    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// CANCEL a booking (Student only)
export const cancelBooking = async (req, res) => {
  try {
    const studentId = req.user._id;
    // And populate the response here too
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $pull: { attendees: studentId } },
      { new: true }
    ).populate("attendees", "email");

    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
