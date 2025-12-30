# Setup Guide

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Configure Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resume-enhancer
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
GEMINI_API_KEY=your-gemini-api-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:5173
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Getting API Keys

### Google Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add it to `GEMINI_API_KEY` in `server/.env`

### Gmail App Password (for OTP emails)
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Add it to `EMAIL_PASS` in `server/.env`

### Razorpay Keys
1. Sign up at https://razorpay.com
2. Get your Key ID and Key Secret from the dashboard
3. Add them to `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `server/.env`
4. Create subscription plans in Razorpay dashboard and add plan IDs to `.env`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network access if using MongoDB Atlas

### Email Not Sending
- Verify Gmail app password is correct
- Check if 2-Step Verification is enabled
- Ensure EMAIL_USER and EMAIL_PASS are set correctly

### CORS Errors
- Verify FRONTEND_URL in backend `.env` matches your frontend URL
- Check that both servers are running

### Port Already in Use
- Change PORT in `server/.env` to a different port
- Update `VITE_API_URL` in `client/.env` accordingly

