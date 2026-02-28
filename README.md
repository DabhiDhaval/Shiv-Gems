# 💎 Shiv Gems \| Full Stack E-Commerce Platform

Welcome to **Shiv Gems** --- a modern full-stack MERN e-commerce
application built for a diamond jewellery business. 🚀

This platform demonstrates secure authentication, admin management, cart
persistence, and a complete checkout workflow.

------------------------------------------------------------------------

## ✨ Features

-   Secure JWT Authentication\
-   Role-based Admin Dashboard\
-   Add / Edit / Delete Products\
-   Persistent Cart (LocalStorage + Backend Sync)\
-   Checkout System (Card / UPI / Bank Transfer UI)\
-   Responsive Design (Mobile, Tablet, Desktop)\
-   Clean REST API Architecture\
-   Proper CORS & Proxy Configuration

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React + TypeScript\
-   Tailwind CSS\
-   Axios\
-   React Router\
-   Context API\
-   Vite

### Backend

-   Node.js\
-   Express.js\
-   MongoDB\
-   Mongoose\
-   JWT Authentication

### Deployment

-   Frontend: Vercel / Netlify\
-   Backend: Render / Railway\
-   Database: MongoDB Atlas

------------------------------------------------------------------------

## 🚀 Getting Started

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/DabhiDhaval/Shiv-Gems.git
cd Shiv-Gems
```

------------------------------------------------------------------------

### 2️⃣ Backend Setup

``` bash
cd Backend
npm install
```

Create a `.env` file inside the **Backend** folder:

``` env
PORT=8000
MONGO_URI=mongodb://localhost:27017/shivgems
JWT_SECRET=your_strong_secret_here
FRONTEND_URL=http://localhost:5173
```

Start backend server:

``` bash
npm run dev
```

------------------------------------------------------------------------

### 3️⃣ Frontend Setup

``` bash
cd Frontend
npm install
npm run dev
```

------------------------------------------------------------------------

### 4️⃣ Build for Production

``` bash
npm run build
```

------------------------------------------------------------------------

## 📂 Folder Structure

``` bash
Shiv-Gems/
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── utils/
│   └── vite.config.ts
│
├── .gitignore
├── package.json
└── README.md
```

------------------------------------------------------------------------

## 🤝 Connect With Me

-   LinkedIn: https://www.linkedin.com/in/dabhi-dhaval/\
-   Instagram: https://www.instagram.com/dabhi_dhaval7\
-   GitHub: https://github.com/DabhiDhaval

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.

------------------------------------------------------------------------

> Made with ❤️ by Dhaval Dabhi
