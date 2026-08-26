# 📝 AI Publishing Platform

A full-stack blogging platform built with the **MERN Stack** (MongoDB, Express, React, Node.js) that lets visitors browse and search blogs, lets registered users write and manage their own posts, and gives admins a dashboard to moderate content. It integrates **Google Gemini** for AI-assisted blog generation and **ImageKit** for optimized image hosting.

> **Status:** 🚧 Actively under development

---

## ✨ Features

### Visitor Features
- Browse all published blogs
- Search blogs by title
- Filter blogs by category
- View complete blog details, including likes and approved comments
- Responsive UI with dark mode support

### User (Author) Features
- Register and log in with email/password, with password-strength validation
- Sign in with **Google OAuth 2.0**
- JWT-based authentication with role-based authorization
- Public author profile pages (`/profile/:username`) with editable bio and avatar
- Write, edit, and publish/unpublish personal blog posts
- Rich text editing with **Quill**, plus Markdown rendering support
- Upload blog thumbnails via ImageKit
- Like blog posts
- Comment on blog posts (subject to admin approval)
- "My Blogs" dashboard to manage personal posts

### 🔐 Authentication & Security
- JWT-based authentication with 7-day token expiration
- Passwords securely hashed using **bcryptjs**
- Password-strength validation during registration
- Separate user and admin authentication flows
- Role-based authorization for users and admins
- Protected backend routes using JWT middleware
- Automatic invalid/expired token cleanup on the client
- Google OAuth 2.0 authentication

### Admin Features
- Secure admin login, separate from user accounts
- Admin dashboard with site-wide stats
- Create, edit, delete, and publish/unpublish any blog post
- Rich text editor using Quill
- Upload and optimize blog thumbnails with ImageKit
- Approve, moderate, or delete comments
- View and manage newsletter subscribers

### AI Integration
- AI-assisted blog content generation using **Google's Gemini API**
- One-click content generation from within the blog editor

### Newsletter
- Visitors can subscribe to a newsletter
- Admins can view and remove subscribers from the dashboard

---

## 🛠 Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS 4
- Axios
- React Hot Toast
- Quill Editor
- Marked (Markdown rendering)
- Moment.js
- Motion (animations)

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT (`jsonwebtoken`) for authentication
- bcryptjs for password hashing
- Google Auth Library (Google OAuth login)
- Multer (file uploads)
- ImageKit (image hosting/optimization)
- Google Gemini API (`@google/genai`) for AI content generation

---

## 📁 Project Structure

```
Blogging-Application/
│
├── Client/
│   ├── context/            # React context (auth/app state)
│   ├── public/
│   ├── src/
│   │   ├── Assets/
│   │   ├── components/     # Shared components (Navbar, Header, BlogCard, etc.)
│   │   └── pages/
│   │       ├── admin/      # Admin dashboard, login, blog & comment management
│   │       └── users/      # Register, login, profile, write/edit blog, OAuth
│   └── package.json
│
├── Server/
│   ├── configs/            # DB, Gemini, ImageKit, Google OAuth configs
│   ├── controllers/        # Auth, Blog, User, Like, Newsletter, Admin logic
│   ├── middlewares/        # Auth, optional auth, "any auth", Multer
│   ├── models/             # User, Blog, Comment, Like, Newsletter schemas
│   ├── routes/             # /api/auth, /api/blog, /api/user, /api/admin, /api/newsletter
│   ├── Server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/AshmitMathur/Blogging-Application.git
cd Blogging-Application
```

### Install dependencies

**Client**
```bash
cd Client
npm install
```

**Server**
```bash
cd ../Server
npm install
```

---

## Environment Variables

### Server (`Server/.env`)

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000

JWT_SECRET=your_secret_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_REDIRECT_URI=your_google_oauth_redirect_uri
FRONTEND_URL=http://localhost:5173

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint

GEMINI_API_KEY=your_gemini_api_key
```

### Client (`Client/.env`)

```env
VITE_BASE_URL=http://localhost:3000
```

> **Note:** Never commit your `.env` files to GitHub.

---

## Running the Project

### Start the backend
```bash
cd Server
npm run server   # nodemon, for development
# or
npm start        # plain node
```

### Start the frontend
```bash
cd Client
npm run dev
```

---

## API Overview

| Base Route | Purpose |
|---|---|
| `/api/auth` | Register, login, Google OAuth, get current user |
| `/api/user` | Get/update user profile |
| `/api/blog` | CRUD on blogs, likes, comments, AI content generation |
| `/api/admin` | Admin login, dashboard, comment moderation, newsletter management |
| `/api/newsletter` | Newsletter subscription |

---

## Screenshots

Screenshots will be added soon.

---

## Current Development Status

### Completed
- User registration/login + Google OAuth
- JWT-based authentication with 7-day token expiration
- Password-strength validation
- Role-based user/admin authorization
- Automatic JWT expiration and invalid-token handling
- User profile pages
- User-authored blog creation, editing, and publishing
- Admin dashboard and blog management
- Rich text editor (Quill) with Markdown rendering
- Image uploads with ImageKit
- Blog likes
- Comments with admin approval/moderation
- Newsletter subscription and admin management
- Blog search and category filtering
- Responsive design with dark mode
- AI blog generation with Gemini
- MongoDB integration
- Express REST API

### In Progress
- AI blog generation refinements
- Better error handling and loading states
- UI refinements

---

## Future Improvements
- Bookmarks / saved posts
- Pagination
- SEO optimization
- Reading time estimation
- Related articles
- Unit and integration testing
- Docker support
- CI/CD pipeline
- Improved password recovery / reset flow

---

## Learning Outcomes

This project helped me gain practical experience with:
- Full-stack MERN development
- REST API design and JWT authentication
- OAuth 2.0 integration (Google)
- MongoDB schema design
- File uploads using Multer
- Image optimization using ImageKit
- React Context API
- Rich text editing with Quill and Markdown rendering
- AI integration using the Gemini API
- CRUD operations
- Frontend-backend communication
- State management
- Responsive UI development

---

## Known Issues

This project is actively being improved. Some features are still under development, and bug fixes and enhancements are being added regularly.

---

## Contributing

Contributions, suggestions, and feedback are welcome. Feel free to fork the repository, open an issue, or submit a pull request.

---

## Author

**Ashmit Mathur**

GitHub: [@AshmitMathur](https://github.com/AshmitMathur)

Live Server: [blogging-application-server.vercel.app](https://blogging-application-server.vercel.app)

---

## License

This project is intended for learning and portfolio purposes.
