import User from '../models/User.model.js';
import { sendOTP } from '../utils/email.util.js';
import { generateTokens } from '../utils/jwt.util.js';

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ email });

    if (user) {
      user.otp = { code: otp, expiresAt };
      await user.save();
    } else {
      user = await User.create({
        email,
        otp: { code: otp, expiresAt }
      });
    }

    await sendOTP(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await user.compareOTP(otp);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    console.log("user in auth controller", user);

    res.json({
      message: 'OTP verified successfully',
      user: {
        id: user._id,
        email: user.email,
        freeEnhancementsUsed: user.freeEnhancementsUsed,
        subscription: user.subscription,
        role: user.role,
        acceptedPrivacyPolicy: user.acceptedPrivacyPolicy,
        acceptedTermsOfService: user.acceptedTermsOfService
      },
      accessToken
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const { verifyToken } = await import('../utils/jwt.util.js');
    const decoded = verifyToken(refreshToken, true);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-otp');
    res.json({
      user: {
        id: user._id,
        email: user.email,
        freeEnhancementsUsed: user.freeEnhancementsUsed,
        subscription: user.subscription,
        role: user.role,
        acceptedPrivacyPolicy: user.acceptedPrivacyPolicy,
        acceptedTermsOfService: user.acceptedTermsOfService
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user' });
  }
};

export const acceptPolicy = async (req, res) => {
  try {
    const { type } = req.body; // 'privacy' or 'terms'

    if (!type || (type !== 'privacy' && type !== 'terms')) {
      return res.status(400).json({ message: 'Invalid type. Must be "privacy" or "terms"' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (type === 'privacy') {
      user.acceptedPrivacyPolicy = true;
    } else if (type === 'terms') {
      user.acceptedTermsOfService = true;
    }

    await user.save();

    res.json({
      message: `${type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} accepted successfully`,
      user: {
        id: user._id,
        email: user.email,
        freeEnhancementsUsed: user.freeEnhancementsUsed,
        subscription: user.subscription,
        role: user.role,
        acceptedPrivacyPolicy: user.acceptedPrivacyPolicy,
        acceptedTermsOfService: user.acceptedTermsOfService
      }
    });
  } catch (error) {
    console.error('Accept policy error:', error);
    res.status(500).json({ message: 'Failed to accept policy' });
  }
};

