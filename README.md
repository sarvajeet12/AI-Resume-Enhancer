# Resume Enhancer - AI-Powered Resume Optimization SaaS

A full-stack MERN application that uses AI to enhance resumes, optimize ATS scores, and help job seekers create compelling resumes.

## 🌐 Deployment : https://ai-resume-enhancer-frontend.onrender.com

## 🚀 Features

- **OTP Authentication** - Secure email-based OTP login
- **AI Resume Enhancement** - Enhance Projects, Certificates, Achievements, About, Experiences, Skills, Bio, and Summary
- **ATS Score Calculation** - Get your resume's ATS compatibility score
- **Usage Limits** - 3 free enhancements, then upgrade required
- **Razorpay Subscription** - Seamless subscription management
- **Visualization & Charts** - Analytics and insights
- **User Review System** - Rate and review enhancements
- **Admin Panel** - Dashboard for administrators

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- TailwindCSS
- Zustand (State Management)
- Axios (HTTP Client)
- Framer Motion (Animations)
- Recharts (Charts)
- React Hot Toast (Notifications)

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT + Refresh Token Authentication
- Axios for (Brevo)
- Google Gemini AI
- Razorpay (Subscriptions)
- PDF Parse (Resume Extraction)

## 📁 Folder Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   └── utils/         # Utility functions
│   └── package.json
│
└── server/                # Backend Express application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── services/      # Business logic
    │   ├── routes/        # API routes
    │   ├── models/        # MongoDB models
    │   ├── middleware/    # Express middleware
    │   └── utils/         # Utility functions
    └── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Brevo account for OTP emails
- Google Gemini API key
- Razorpay account (for subscriptions)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd AI-Resume-Enhancer
   ```

2. **Install Backend Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**

   Create `server/.env`:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/resume-enhancer
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   JWT_EXPIRE=15m
   JWT_REFRESH_EXPIRE=7d
   BREVO_API_KEY=brevo_api_key
   GEMINI_API_KEY=your-gemini-api-key
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   FRONTEND_URL=http://localhost:5173
   ```

   Create `client/.env`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the Development Servers**

   Backend (from `server` directory):

   ```bash
   npm run dev
   ```

   Frontend (from `client` directory):

   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📝 API Endpoints

### Authentication

- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Resume

- `POST /api/resume/upload` - Upload and enhance resume
- `GET /api/resume` - Get all user resumes
- `GET /api/resume/:id` - Get specific resume
- `DELETE /api/resume/:id` - Delete resume

### Subscription

- `GET /api/subscription/plans` - Get available plans
- `POST /api/subscription/create` - Create subscription
- `POST /api/subscription/verify` - Verify payment
- `GET /api/subscription/current` - Get current subscription
- `POST /api/subscription/cancel` - Cancel subscription

### Review

- `POST /api/review` - Create review
- `GET /api/review` - Get all reviews
- `GET /api/review/stats` - Get review statistics

### Admin

- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users

## 📊 API Response Example

### Example: `POST /api/auth/send-otp`

#### Request Body:

```json
{
  "email": "user@example.com"
}
```

#### Response:

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### Example: `POST /api/resume/upload`

#### Request Body:

```json
{
  "file": "<base64-encoded-pdf>"
}
```

#### Response:

```json
{
  "success": true,
  "data": {
    "enhancedResume": {
      "skills": ["JavaScript", "React"],
      "atsScore": 85
    }
  }
}
```

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Rate limiting on OTP requests
- Secure cookie handling
- Input validation and sanitization
- CORS configuration

## 📊 Features in Detail

### AI Enhancement

- Extracts data from PDF resumes
- Enhances all sections using Google Gemini AI
- Calculates ATS compatibility score
- Provides before/after comparison

### Subscription Management

- Free tier: 3 enhancements
- Basic plan: Unlimited enhancements
- Premium plan: All features + extras
- Razorpay integration for payments

### Analytics

- Resume statistics charts
- ATS score visualization
- Section distribution analysis
- Usage tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Google Gemini AI
- Razorpay
- React Community
- TailwindCSS
