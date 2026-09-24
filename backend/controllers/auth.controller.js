import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import transporter from '../config/mailer.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long',
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'An account with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error creating account',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error logging in',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'email'],
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(200).json({
        message:
          'If an account with this email exists, password reset instructions have been sent',
      });
    }

    const resetToken = jwt.sign(
      {
        userId: user.id,
        purpose: 'password-reset',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Reset your AI Reception password',
      text: `Reset your password using this link: ${resetLink}`,
    });

    res.status(200).json({
      message:
        'If an account with this email exists, password reset instructions have been sent',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error requesting password reset',
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: 'Token and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long',
      });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (payload.purpose !== 'password-reset') {
      return res.status(400).json({
        message: 'Invalid password reset token',
      });
    }

    const user = await User.findByPk(payload.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: 'Invalid or expired password reset token',
    });
  }
};