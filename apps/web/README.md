# AnonymousFeedback 💭

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://anonymous-feedback-roan.vercel.app/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

An anonymous messaging platform that enables users to send and receive anonymous, engaging, and friendly messages. Built with modern tools for a smooth and secure user experience.

## ✨ Features

- **🕵️ Anonymous Messaging**: Users can send anonymous messages without revealing their identity
- **🤖 AI-Powered Suggested Questions**: Get OpenAI-generated open-ended questions to spark conversations
- **🌐 Public Profile Links**: Users have public profiles where they receive anonymous messages
- **📧 OTP Verification**: Secure email verification using Resend
- **🔐 Authentication**: Secure user sign-in and management using NextAuth.js
- **⚡ Streaming AI Responses**: Real-time AI-generated suggestions with advanced streaming
- **🎨 Modern UI Components**: Built with shadcn/ui for polished and accessible frontend design
- **✅ Form Validation**: Robust input validation via Zod and React Hook Form
- **🔔 Toasts & Notifications**: Friendly user feedback with Sonner toast notifications
- **📱 Responsive Design**: Mobile-first responsive design with Tailwind CSS

## 🚀 Live Demo

Check out the live application: [https://anonymous-feedback-roan.vercel.app/](https://anonymous-feedback-roan.vercel.app/)

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15 (App Router), React 19, shadcn/ui, Tailwind CSS 4 |
| **Backend** | Next.js API Routes (Edge Runtime) |
| **Database** | MongoDB with Mongoose |
| **Authentication** | NextAuth.js |
| **Email Service** | Resend (OTP Verification) |
| **AI Integration** | OpenAI API with AI SDK for streaming suggestions |
| **Form Handling** | React Hook Form with Zod validation |
| **Styling** | Tailwind CSS with shadcn/ui components |
| **HTTP Client** | Axios for API requests |
| **Notifications** | Sonner for toast messages |
| **Deployment** | Vercel |

## 🚦 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- OpenAI API key
- Resend API key for email verification
- MongoDB database connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/essambhatti/AnonymousFeedbackApp.git
   cd AnonymousFeedbackApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000

   # Database
   MONGODB_URI=your_mongodb_connection_string

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key_here

   # Email Service
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to explore the app.

## 📖 Usage

1. **Sign Up / Sign In**: Authenticate securely using NextAuth.js
2. **Verify Account**: Receive OTP via email using Resend to verify your account
3. **Get Profile Link**: Share your public profile link to receive anonymous messages
4. **Send Messages**: Visitors can send anonymous messages via the messaging form
5. **AI Suggestions**: Use OpenAI-powered suggestions to get conversation starters
6. **Interact**: Click suggested messages to auto-fill your input and send easily

## 📁 Project Structure

```
truefeedback/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (app)/             # Main app pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions and configurations
├── models/               # MongoDB/Mongoose models
├── schemas/              # Zod validation schemas
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code linting |

## 🌟 Key Features Explained

### Anonymous Messaging System
Users can create public profiles and receive completely anonymous messages from anyone with their profile link.

### AI-Powered Suggestions
Integration with OpenAI API provides intelligent, context-aware message suggestions to help users craft engaging anonymous messages.

### Secure Authentication
NextAuth.js handles user authentication with email verification via Resend's OTP system.

### Modern UI/UX
Built with shadcn/ui components and Tailwind CSS for a clean, accessible, and responsive design.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

**Muhammad Essam Bhatti**
- GitHub: [@essambhatti](https://github.com/essambhatti)
- LinkedIn: [Muhammad Essam Bhatti](https://www.linkedin.com/in/essam-bhatti/)

---

**Thank you for checking out TrueFeedback — making anonymous conversations friendly, engaging, and safe! 🚀**
