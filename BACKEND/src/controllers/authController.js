import bcrypt from "bcryptjs";
import { userModel } from "../model/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import otpModel from "../model/otpModel.js";
import sessionModel from "../model/sessionModel.js";
import * as gen from "../utils/generateToken.js";

export async function register(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyExist = await userModel.findOne({
      $or: [{ email }],
    });

    if (isAlreadyExist) {
      return res.status(409).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpHash = await bcrypt.hash(`${otp}`, salt);
      const message = `
                <h2>Welcome to ShopNest, ${username}!</h2>
                <p>Thank you for registering on our platform.</p>
                <p>Your one-time verification OTP is: <strong>${otp}</strong></p>
            `;

      await otpModel.create({
        user: user._id,
        email,
        otpHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      await sendEmail({
        email,
        subject: "Welcome to ShopNest - Your OTP",
        message,
      });

      return res.status(201).json({
        message: `User registered successfully. OTP sent to ${email}`,
        user: {
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
        },
      });
    }

    return res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function verifyUser(req, res) {
  try {
    const { email, otp } = req.body;

    const otpDoc = await otpModel.findOne({
      email,
      expiresAt: { $gt: new Date() },
    });

    if (!otpDoc) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const isMatch = await bcrypt.compare(`${otp}`, otpDoc.otpHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const user = await userModel.findByIdAndUpdate(
      otpDoc.user,
      { isVerified: true },
      { new: true },
    );

    await otpModel.deleteMany({ user: otpDoc.user });

    const accessToken = gen.accessToken(user._id);
    const refreshToken = gen.refreshToken(user._id);

    const salt = await bcrypt.genSalt(10);
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

    await sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Email verified successfully",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = gen.accessToken(user._id);
      const refreshToken = gen.refreshToken(user._id);

      const salt = await bcrypt.genSalt(10);
      const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

      await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Logged in successfully",
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
        accessToken,
      });
    }

    return res.status(400).json({ message: "Username or password is wrong" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const users = await userModel.find({}).select("-password");
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function logout(req, res) {
  try {
    if (req.user) {
      await sessionModel.updateMany(
        { user: req.user._id, revoke: false },
        { revoke: true },
      );
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { username, email, role, isVerified, createdAt, updatedAt } =
      req.user;
    return res.json({
      user: { username, email, role, isVerified, createdAt, updatedAt },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoke: false,
  });

  if (!session) {
    return res.status(401).json({
      message: "invalid refresh token",
    });
  }

  const accessToken = jwt.sign(
    {
      id: decoded.id,
      sessionId: session._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "10m",
    },
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "10d",
    },
  );

  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");
  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "access token refreshed successfully",
    accessToken,
  });
}
