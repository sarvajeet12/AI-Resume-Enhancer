import axios from "axios";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export const sendOTP = async (email, otp) => {
  try {
    await axios.post(
      BREVO_URL,
      {
        sender: {
          name: "Resume Enhancer",
          email: "sarvajeetshahktn@gmail.com", // must be verified in Brevo
        },
        to: [{ email }],
        subject: "Your OTP for Resume Enhancer",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Resume Enhancer - OTP Verification</h2>
            <p>Your OTP code is:</p>
            <div style="background-color: #b2bec3; color: black; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    return true;
  } catch (error) {
    console.error(
      "Brevo email error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
