import crypto from "crypto";
import Session from "../models/session.model.js";

const generateMeetingData = () => {
  const roomId = crypto.randomBytes(6).toString("hex");
  const domain = "https://meet.jit.si";

  return {
    meetingLink: `${domain}/SoulCare-${roomId}`,
    roomName: `SoulCare-${roomId}`,
    roomId
  };
};


export const bookSession = async (req, res) => {
  try {
    const { c_id, c_name, anonymous_id, slot, date, short_note } = req.body;

    if (!c_id || !c_name || !anonymous_id || !slot || !date || !short_note) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const meetingData = generateMeetingData();

    const bookingData = {
      c_id,
      c_name,
      anonymous_id,
      slot,
      date,
      short_note,
      session_id: meetingData.roomId,
      session_link: meetingData.meetingLink
    };

    await Session.create(bookingData);

    res.status(201).json({
      message: "Session booked successfully",
      bookingData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error booking session" });
  }
};

export const getCounsellorSessions = async (req, res) => {
  try {
    const { c_id } = req.body;

    if (!c_id) {
      return res.status(400).json({ message: "Counsellor ID is required" });
    }

    const sessions = await Session.find({ c_id }).sort({ date: 1 });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: "No sessions found for this counsellor" });
    }

    res.status(200).json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching counsellor sessions" });
  }
};

export const getStudentSessions = async (req, res) => {
  try {
    const { anonymous_id } = req.body;

    if (!anonymous_id) {
      return res.status(400).json({ message: "Anonymous ID is required" });
    }

    const sessions = await Session.find({ anonymous_id }).sort({ date: 1 });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: "No sessions found for this student" });
    }

    res.status(200).json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching student sessions" });
  }
};