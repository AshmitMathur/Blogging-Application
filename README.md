# 📝 AI Publishing Platform

A full-stack blogging platform built with the **MERN Stack** (MongoDB, Express, React, Node.js) that lets visitors browse and search blogs, lets registered users write and manage their own posts, and gives admins a dashboard to moderate content. It integrates **Google Gemini** for AI-assisted blog generation and **ImageKit** for optimized image hosting.

> **Status:** 🚧 Actively under development

---

## ✨ Features

### Visitor Features

* Browse all published blogs
* Search blogs by title
* Filter blogs by category
* View complete blog details, including likes and approved comments
* Graceful loading and error handling on blog detail pages
* Responsive UI with dark mode support
* View public author profiles


### User (Author) Features

* Register and log in with email/password, with password-strength validation
* Sign in with **Google OAuth 2.0**
* JWT-based authentication with role-based authorization
* Public author profile pages (`/profile/:username`)
* Edit profile name, bio, and avatar
* Write, edit, and publish/unpublish personal blog posts
* Rich text editing with **Quill**, plus Markdown rendering support
* Upload blog thumbnails via ImageKit
* Like and unlike blog posts
* View blogs you have liked
* Bookmark and unbookmark blog posts
* View saved/bookmarked blogs
* Comment on blog posts (subject to admin approval)
* "My Blogs" dashboard to manage personal posts

### 🔐 Authentication & Security

* JWT-based authentication with 7-day token expiration
* Passwords securely hashed using **bcryptjs**
* Password-strength validation during registration
* Separate user and admin authentication flows
* Role-based authorization for users and admins
* Protected backend routes using JWT middleware
* Optional authentication for public blog interactions
* Automatic invalid/expired token cleanup on the client
* Google OAuth 2.0 authentication

### 👤 User Profiles

* Public profiles accessible through `/profile/:username`
* Display user avatar, name, username, bio, and blog statistics
* Display published blogs written by the user
* Profile owner can edit their profile
* Profile owner can access:

  * **Published Blogs**
  * **Liked Blogs**
  * **Bookmarked Blogs**
* Liked and bookmarked content is only accessible from the user's own profile

### 👍 Blog Interactions

* Like and unlike published blogs
* Display like counts on blog cards
* Display like status for the current user
* Loading states while updating likes
* Bookmark and unbookmark published blogs
* Loading states while updating bookmarks
* View all liked blogs from the user profile
* View all bookmarked blogs from the user profile
* Like and bookmark data are stored separately from blog documents using dedicated MongoDB models
* Loading state while submitting comments
* Error feedback for failed blog interactions


### 🛡️ Blog Authorization

* Users can edit and delete their own blogs
* Admins can edit and delete any blog
* Admins can publish/unpublish blogs
* User-created blogs are associated with their author
* Admin-created blogs can exist without a user author
* Unpublished blogs are restricted to their owner and admins
* Only published blogs can be liked or bookmarked

### Admin Features

* Secure admin login, separate from user accounts
* Admin dashboard with site-wide stats
* Create, edit, delete, and publish/unpublish any blog post
* Rich text editor using Quill
* Upload and optimize blog thumbnails with ImageKit
* Approve, moderate, or delete comments
* View and manage newsletter subscribers

### 🤖 AI Integration

* AI-assisted blog content generation using **Google's Gemini API**
* One-click content generation from within the blog editor

### 📧 Newsletter

* Visitors can subscribe to a newsletter
* Admins can view and remove subscribers from the dashboard

---

## 🛠 Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Tailwind CSS 4
* Axios
* React Hot Toast
* Quill Editor
* Marked (Markdown rendering)
* Moment.js
* Motion (animations)

### Backend

* Node.js
* Express 5
* MongoDB with Mongoose
* JWT (`jsonwebtoken`) for authentication
* bcryptjs for password hashing
* Google Auth Library (Google OAuth login)
* Multer (file uploads)
* ImageKit (image hosting/optimization)
* Google Gemini API (`@google/genai`) for AI content generation

---

## 📁 Project Structure

```text
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
│   ├── controllers/        # Auth, Blog, User, Like, Bookmark, Newsletter, Admin logic
│   ├── middlewares/        # Auth, optional auth, "any auth", Multer
│   ├── models/             # User, Blog, Comment, Like, Bookmark, Newsletter schemas
│   ├── routes/             # /api/auth, /api/blog, /api/user, /api/bookmark, /api/admin, /api/newsletter
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

## 🔑 Environment Variables

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

## ▶️ Running the Project

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

The frontend runs on Vite's development server, while the backend runs on the configured Express port.

---

## 🔌 API Overview

| Base Route        | Purpose                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| `/api/auth`       | Register, login, Google OAuth, get current user                           |
| `/api/user`       | Get public user profiles and update the authenticated user's profile      |
| `/api/blog`       | Blog CRUD, likes, comments, AI content generation                         |
| `/api/bookmark`   | Bookmark/unbookmark blogs and retrieve the authenticated user's bookmarks |
| `/api/admin`      | Admin login, dashboard, comment moderation, newsletter management         |
| `/api/newsletter` | Newsletter subscription                                                   |

### Blog Interaction Endpoints

| Method | Endpoint                 | Purpose                                        |
| ------ | ------------------------ | ---------------------------------------------- |
| `POST` | `/api/blog/like/:blogId` | Like or unlike a blog                          |
| `GET`  | `/api/blog/like/:blogId` | Get like count and current user's like status  |
| `GET`  | `/api/blog/liked`        | Get blogs liked by the authenticated user      |
| `POST` | `/api/bookmark/:blogId`  | Bookmark or remove a bookmark                  |
| `GET`  | `/api/bookmark/:blogId`  | Get bookmark status                            |
| `GET`  | `/api/bookmark/my`       | Get blogs bookmarked by the authenticated user |

---

## 📸 Screenshots

Screenshots will be added soon.

---

## 📊 Current Development Status

### ✅ Completed

* User registration/login + Google OAuth
* JWT-based authentication with 7-day token expiration
* Password-strength validation
* Role-based user/admin authorization
* Automatic JWT expiration and invalid-token handling
* Public user profile pages
* Profile editing
* User-authored blog creation, editing, and publishing
* Admin dashboard and blog management
* Rich text editor (Quill) with Markdown rendering
* Image uploads with ImageKit
* Blog likes and like counts
* Liked blogs section
* Blog bookmarks/saved posts
* Bookmarked blogs section
* Comments with admin approval/moderation
* Newsletter subscription and admin management
* Blog search and category filtering
* Responsive design with dark mode
* AI blog generation with Gemini
* MongoDB integration
* Express REST API
* Blog ownership and role-based authorization
* Blog detail page loading and error handling
* Loading states for like, bookmark, and comment actions
* User-friendly error feedback for blog interactions

### 🚧 In Progress

* AI blog generation refinements
* UI refinements
* Additional testing and edge-case handling
---

## 🔮 Future Improvements

* Pagination
* SEO optimization
* Reading time estimation
* Related articles
* Unit and integration testing
* Docker support
* CI/CD pipeline
* Improved password recovery / reset flow
* Additional profile statistics
* Performance optimization

---

## 📚 Learning Outcomes

This project helped me gain practical experience with:

* Full-stack MERN development
* REST API design
* JWT authentication and role-based authorization
* OAuth 2.0 integration with Google
* MongoDB and Mongoose schema design
* Relational-style references and population in MongoDB
* File uploads using Multer
* Image optimization using ImageKit
* React Context API
* React Router
* Rich text editing with Quill
* Markdown rendering
* AI integration using the Gemini API
* Blog interaction systems such as likes and bookmarks
* CRUD operations
* Frontend-backend communication
* State management
* Responsive UI development
* Authentication middleware design
* Protected and optional-authentication routes

---

## ⚠️ Known Issues

The project is actively being improved. Minor UI refinements, error-handling improvements, and additional testing are still ongoing.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

Feel free to:

* Fork the repository
* Open an issue
* Submit a pull request

---

## 👨‍💻 Author

**Ashmit Mathur**

GitHub: [@AshmitMathur](https://github.com/AshmitMathur)

Live Server: [blogging-application-server.vercel.app](https://blogging-application-server.vercel.app)

---

## 📄 License

This project is intended for learning and portfolio purposes.
