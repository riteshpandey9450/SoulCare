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
