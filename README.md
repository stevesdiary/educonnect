# EduConnect
Students Knowledge Hub for peer learning.

In many public secondary schools across Africa, students often struggle to get quick answers to their study questions.
Whether it's understanding a tricky math concept, solving a science problem, or needing advice on study techniques, there's a gap in accessible, student-friendly resources.
EduConnect aims to solve this by creating an open platform where students can ask questions, share knowledge, and help each other grow academically. This tool is inspired by platforms like Quora but tailored specifically for students. It will be a space where they can engage, learn from their peers, and feel empowered to ask and answer questions freely. The platform will encourage a community of learners helping each other succeed while also building a habit of collaborative learning.

## Features
1. **Ask & Answer** — Students can post questions in different subjects (e.g., math, science, literature). Other students can answer, share explanations, or suggest study resources.
2. **Upvotes & Badges** — Students can upvote helpful answers, encouraging quality content.
3. **Subject Categories & Search** — Questions are organised by subject categories (e.g., math, biology, history) for easy browsing. A search bar allows students to quickly find specific topics or questions.
4. **File Attachments** — Charts and illustrations can be attached to questions and answers to clarify or reference content.
5. **Groups** — Groups based on topics, categories or knowledge areas can be created and joined by students.
6. **Real-time Chat** — Students can communicate in chat rooms via Socket.io.
7. More features will be added.

📄 Full documentation: [Google Docs](https://docs.google.com/document/d/1E8xai5ZqqCmexNUI6vRT21X0M7LmPd2TFBip-TF0L0M/edit?usp=sharing)

---

## Tech Stack
- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — PostgreSQL via Sequelize ORM
- **Cache / OTP store** — Redis
- **File uploads** — Cloudinary
- **Real-time** — Socket.io
- **Auth** — JWT
- **Email** — Nodemailer (Brevo SMTP)

---

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- A running **PostgreSQL** database
- A running **Redis** instance (local or cloud e.g. Redis Cloud, Upstash)
- A **Cloudinary** account
- A **Brevo** (or any SMTP) account for email

---

### 1. Clone the repository

```bash
git clone https://github.com/stevesdiary/educonnect.git
cd educonnect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Open `.env` and set the following values:

```env
# Server
LOCAL_PORT=5200
NODE_ENV=development
FRONTEND_URL=http://localhost:5200

# Database — use a connection string (recommended)
DB_URL=postgres://user:password@host:5432/dbname

# Or use individual variables if you don't have a URL
# DB_USER=
# DB_PASSWORD=
# DB_NAME=
# DB_HOST=
# DB_PORT=5432

# JWT
JWT_SECRET=your_long_random_secret

# Redis
REDIS_URL=redis://localhost:6379

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Brevo SMTP)
SMTP_SERVER=smtp-relay.brevo.com
SMTP_USER=your_brevo_smtp_login
SMTP_PASSWORD=your_brevo_smtp_password

# Paystack (for subscription/payment features)
PAYSTACK_SECRET_KEY=your_paystack_secret_key

# App domain (used in verification email links)
DOMAIN=http://localhost:5200/user/verify-email
```

### 4. Run database migrations

This creates all the required tables in your PostgreSQL database:

```bash
npx sequelize-cli db:migrate
```

To undo all migrations if needed:

```bash
npx sequelize-cli db:migrate:undo:all
```

### 5. Start the server

```bash
npm start
```

The server will start on `http://localhost:5200` by default.

---

## API Overview

| Method | Route | Description | Auth required |
|--------|-------|-------------|---------------|
| POST | `/user/register` | Register a new user | No |
| POST | `/user/verify-email` | Verify email with OTP | No |
| POST | `/user/login` | Login | No |
| POST | `/user/logout` | Logout | No |
| GET | `/user/allusers` | Get all users | No |
| GET | `/user/getone/:id` | Get a single user | No |
| PATCH | `/user/update/:id` | Update user profile | Yes |
| DELETE | `/user/delete/:id` | Delete user | No |
| POST | `/subject/create` | Create a subject | Yes |
| GET | `/subject/all` | Get all subjects | Yes |
| GET | `/subject/one/:id` | Get one subject | Yes |
| DELETE | `/subject/delete/:id` | Delete a subject | Yes |
| POST | `/question/create` | Post a question | Yes |
| GET | `/question/get-all` | Get all questions | Yes |
| GET | `/question/get-one/:question_id` | Get one question | Yes |
| POST | `/answer/create/:question_id` | Answer a question | Yes |
| GET | `/answer/allanswers` | Get all answers | Yes |
| GET | `/answer/getone/:id` | Get one answer | Yes |
| PATCH | `/answer/update/:id` | Update an answer | Yes |
| DELETE | `/answer/deleteanswer/:id` | Delete an answer | Yes |
| GET | `/auth/google` | Google OAuth login | No |

> Authenticated routes require a `Bearer <token>` header.

---

## Project Structure

```
educonnect/
├── config/         # Database, Cloudinary, Redis, Multer config
├── controllers/    # Route handler logic
├── middlewares/    # Auth, error handling, validation
├── migrations/     # Sequelize migration files
├── models/         # Sequelize models
├── routes/         # Express route definitions
├── services/       # Business logic layer
├── socket/         # Socket.io chat setup
├── validator/      # Joi validation schemas
├── app.js          # App entry point
└── .env.example    # Environment variable template
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: your feature description"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

ISC © [Stephen Oyeyemi](https://github.com/stevesdiary)
