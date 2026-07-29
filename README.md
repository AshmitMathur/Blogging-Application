# 📝AI Publishing Platform

A full-stack blogging platform built with the **MERN Stack** that allows users to browse blogs, search by category, read articles, and leave comments. The application also includes an admin dashboard for managing blogs and integrates AI-powered content generation and ImageKit for optimized image hosting.

> **Status:** 🚧 Actively under development

---

## ✨ Features

### User Features

* Browse all published blogs
* Search blogs by title or category
* Filter blogs using categories
* View complete blog details
* Responsive UI for desktop and mobile
* Leave comments on blog posts

### Admin Features

* Secure admin login
* Create new blog posts
* Rich text editor using Quill
* Upload blog thumbnails
* Image optimization with ImageKit
* Publish or save blogs as drafts
* Manage blog posts
* View and manage comments
* Dashboard for blog management

### AI Integration

* AI-assisted blog generation using Google's Gemini API
* Rich text editing support
* One-click content generation (work in progress)

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Axios
* React Hot Toast
* Quill Editor
* Motion

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* ImageKit
* Google Gemini API

---

## 📁 Project Structure

```
Blog/
│
├── Client/
│   ├── src/
│   ├── context/
│   ├── public/
│   └── package.json
│
├── Server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
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
```

```bash
cd Blogging-Application
```

---

## Install Dependencies

### Client

```bash
cd Client
npm install
```

### Server

```bash
cd ../Server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **Server** directory.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint

GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET=your_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

> **Note:** Never commit your `.env` file to GitHub.

---

## Running the Project

### Start the backend

```bash
cd Server
npm run server
```

or

```bash
npm start
```

(depending on your scripts)

### Start the frontend

```bash
cd Client
npm run dev
```

---

## Screenshots

Screenshots will be added soon.

---

## Current Development Status

### Completed

* Blog listing
* Blog details page
* Blog search
* Category filtering
* Responsive design
* Admin dashboard
* Blog creation
* Rich text editor
* Image uploads with ImageKit
* MongoDB integration
* Express REST API

### In Progress

* AI blog generation improvements
* Comment moderation
* Better error handling
* Loading states
* Form validation
* UI refinements

---

## Future Improvements

* User authentication
* User profiles
* Blog likes
* Bookmarks
* Pagination
* Dark mode
* Markdown support
* SEO optimization
* Reading time estimation
* Related articles
* Email newsletter
* Unit and integration testing
* Docker support
* CI/CD pipeline

---

## Learning Outcomes

This project helped me gain practical experience with:

* Full-stack MERN development
* REST API design
* MongoDB schema design
* File uploads using Multer
* Image optimization using ImageKit
* React Context API
* Rich text editing with Quill
* AI integration using Gemini API
* CRUD operations
* Frontend-backend communication
* State management
* Responsive UI development

---

## Known Issues

This project is actively being improved. Some features are still under development, and bug fixes and enhancements are being added regularly.

---

## Contributing

Contributions, suggestions, and feedback are welcome. Feel free to fork the repository, open an issue, or submit a pull request.

---

## Author

**Ashmit Mathur**

GitHub: https://github.com/AshmitMathur

---

## License

This project is intended for learning and portfolio purposes.
