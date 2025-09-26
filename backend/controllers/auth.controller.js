import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import sendCookie from '../utils/sendCookie.js';

// Signing Up the User
export const signup = async (req, res) => {  
  try {
    const { name, email, password, gender } = req.body;
    let user = await User.findOne({ email });
    if (user) 
    {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword, gender });
    if (user) {
      await user.save();
    //   sendCookie(user._id, res);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logging in the User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    sendCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Logging Out the User
export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("jwt", "", {
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Successfully logged out",
      });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};