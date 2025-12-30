# AI Interview Mocker 🤖

An advanced AI-powered mock interview application designed to help users prepare for job interviews. This application leverages **Google Gemini AI** to generate personalized interview questions and provide feedback based on user responses.

## 🚀 Features

- **AI-Powered Question Generation**: Generates 5 curated interview questions based on Job Role, Description, and Experience level using **Google Gemini 2.0 Flash**.
- **Interactive Interview Session**: Records user audio and provides real-time transcription.
- **Instant Feedback**: Analyzes user answers and provides a rating and constructive feedback.
- **Dashboard**: Manage past interviews and view performance history.
- **Secure Authentication**: Integrated with **Clerk** for secure user sign-up and sign-in.
- **Responsive Design**: Built with modern UI components using **Radix UI** and **Tailwind CSS**.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: JavaScript
- **Styling**: Tailwind CSS, Lucide React
- **Database**: PostgreSQL (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Model**: Google Gemini 2.0 Flash (`gemini-2.0-flash`)

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_DRIZZLE_DATABASE_URL=postgresql://...

NEXT_PUBLIC_GEMINI_API_KEY=AIza...
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
```

## 🏃‍♂️ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/ai-interview-mocker.git
    cd ai-interview-mocker
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Database**:
    Push the schema to your Neon PostgreSQL database:
    ```bash
    npm run db:push
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs the linter.
- `npm run db:push`: Pushes schema changes to the database.
- `npm run db:studio`: Opens Drizzle Studio to manage database records.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
