import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  freeEnhancementsUsed: {
    type: Number,
    default: 0
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    razorpaySubscriptionId: String,
    razorpayCustomerId: String,
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  acceptedPrivacyPolicy: {
    type: Boolean,
    default: false
  },
  acceptedTermsOfService: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.methods.compareOTP = async function(enteredOTP) {
  if (!this.otp || !this.otp.code) return false;
  if (this.otp.expiresAt < new Date()) return false;
  return this.otp.code === enteredOTP;
};

export default mongoose.model('User', userSchema);

