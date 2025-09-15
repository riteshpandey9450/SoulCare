import crypto from "crypto";


export const creatRoom = async (req, res) => {
    try {
    const { studentName, counsellorName } = req.body;

    // Generate a unique room ID
    const roomId = crypto.randomBytes(6).toString("hex"); // e.g., "a1b2c3d4e5f6"

    // Free Jitsi domain
    const domain = "https://meet.jit.si";

    // Meeting link
    const meetingLink = `${domain}/SoulCare-${roomId}`;

    // Optional metadata you can store in DB
    const meetingData = {
      meetingLink,
      roomName: `SoulCare-${roomId}`,
      studentName,
      counsellorName,
      createdAt: new Date(),
    };

    res.json(meetingData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating meeting" });
  }
};
