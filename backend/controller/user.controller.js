import User from '../models/user.model.js';
import cloudinary from '..//utils/cloudinary.js';
import jwt from 'jsonwebtoken';

function generateUserId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // ensures 4-digit number
  return `User-${randomNum}`;
}

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true, 
    sameSite: "strict", 
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};



export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please add all fields' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, anonymous_id:generateUserId() });
    await user.save();

    generateToken(user._id, res);

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        anonymous_id: user.anonymous_id,
        role: user.role
      },
    });

  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: error.message });
  }
};



export const addCounsellor = async (req, res) => {
  try {
    const { name, c_id, email, specialization, qualification, experience, mobile, about } = req.body;

    let imageUrl = '';

    if (req.file) {
      try {
        const cloudinaryResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        });

        imageUrl = cloudinaryResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    if (!name || !c_id || !specialization || !qualification || !experience || !mobile || !about || !email)
      return res.status(400).json({ message: 'Please add all fields' });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, c_id, email, password: c_id+"@123", specialization, qualification, experience, mobile, about, profileUrl: imageUrl, role: 'counsellor' });
    await user.save();

    generateToken(user._id, res);

    return res.status(201).json({
      message: 'Counsellor registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileUrl: user.profileUrl,
        c_id: user.c_id,
        specialization: user.specialization,
        qualification: user.qualification,
        experience: user.experience,
        mobile: user.mobile,
        about: user.about,
        password: user.password,
      },
    });

  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: error.message });
  }
};






export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    generateToken(user._id, res);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json(userWithoutPassword);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const logout = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(400).json({ message: "User not logged in" });
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {name,roolNo,mobile,stream,academicYear} = req.body;
    let imageUrl = '';

    if (req.file) {
      try {
        const cloudinaryResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        });

        imageUrl = cloudinaryResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    
    user.name = name || user.name;
    user.roolNo = roolNo || user.roolNo;
    user.mobile = mobile || user.mobile;
    user.stream = stream || user.stream;
    user.academicYear = academicYear || user.academicYear;
    user.profileUrl = imageUrl || user.profileUrl;


    const updatedUser = await user.save();
    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
