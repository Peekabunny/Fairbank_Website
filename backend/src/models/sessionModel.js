import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tutor: {
      type: String, 
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    // The attendees array will store the IDs of the users (students) who have booked the session.
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This links to your User model
      },
      
    ],
    
          user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;