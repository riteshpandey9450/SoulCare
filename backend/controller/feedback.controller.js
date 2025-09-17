import Feedback from "../models/feedback.model.js";

export const generateFeedback = async (req, res) => {
  try {
    const {
      c_id,
      anonymous_id,
      student_name,
      councellor_name,
      date,
      status,
      problems,
      recommendations, // <-- use plural to match schema
    } = req.body;

    const feedback = new Feedback({
      c_id,
      anonymous_id,
      student_name,
      councellor_name,
      date,
      status,
      problems,
      recommendations, // <-- corrected
    });

    await feedback.save();

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error generating feedback:", error);
    res
      .status(500)
      .json({ error: "Error generating feedback", message: error.message });
  }
};
