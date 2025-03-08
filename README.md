# 📚 Booknerd - Full-Stack Bookstore Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue) 
![License](https://img.shields.io/badge/license-ISC-green) 
![Deployment](https://img.shields.io/badge/deployed%20on-Vercel-black)

A modern MERN stack e-commerce platform for book enthusiasts, featuring user authentication, cart management, and a powerful admin dashboard.

[![Booknerd Preview](client/src/assets/client.jpeg)](https://booknerdstore.vercel.app)  
*Replace [IMAGE1] with hero screenshot of your site*

## 🚀 Features

### User Features
- 🔐 Firebase Authentication (Login/Signup)
- 🛒 Add to Cart & Checkout (Payment-on-Delivery)
- ❤️ Favorite Books Collection
- 📦 Order Tracking (Pending → Delivered)

### Admin Dashboard
- 📊 Sales Analytics & Order Management
- 🛠️ CRUD Operations for Books
- 📈 Real-time Status Updates (Pending/Confirmed/Shipped/Delivered/Cancelled)
- 👥 Admin Privilege System (*Work in Progress: View-Only Mode*)

[![Admin Dashboard](client/src/assets/admin.jpeg)](https://booknerdstore.vercel.app)  
*Replace [IMAGE2] with admin dashboard screenshot*

## ⚙️ Tech Stack

**Frontend**  
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react) 
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?logo=redux) 
![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-20.0-339933?logo=node.js) 
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express) 
![MongoDB](https://img.shields.io/badge/MongoDB-8.10-47A248?logo=mongodb)

**Utilities**  
![Firebase](https://img.shields.io/badge/Firebase-11.3-FFCA28?logo=firebase) 
![JWT](https://img.shields.io/badge/JWT-9.0-000000?logo=jsonwebtokens) 
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Robert-Ncube/Booknerd.git
   cd Booknerd
   
2. **Install Dependencies**
   ```bash
   cd booknerd/server && npm install
   cd ../client && npm install
  
3. **Environment Setup**
    ```bash
   # Create .env in /booknerd/server
   - PORT=5000
   - MONGODB_URI=your_mongodb_connection_string
   - JWT_SECRET=your_jwt_secret_key
    
   # Create .env in /booknerd/client
   - VITE_NODE_ENV=dev
   - VITE_FIREBASE_API_KEY=your_firebase_key
   - VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
   - VITE_FIREBASE_PROJECT_ID=your_project_id
   - VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   - VITE_FIREBASE_SENDER_ID=your_sender_id
   - VITE_FIREBASE_APP_ID=your_app_id
   - VITE_FIREBASE_MESUREMENT_ID=your_measurement_id

5. **Start Development Servers**
   ```bash
   # Backend (from /booknerd-server)
   npm run dev
   
   # Frontend (from /client)
   npm run dev

## 🔑 Environment Variables Usage

| Variable                     | Location                  | Purpose                          |
|------------------------------|---------------------------|----------------------------------|
| `PORT`                       | `server.js`               | Backend server port              |
| `MONGODB_URI`                | `server.js`               | MongoDB connection string        |
| `JWT_SECRET`                 | `AdminUserController.js`  | Admin auth token signing         |
| `VITE_FIREBASE_*`            | `firebase.js`             | Firebase client configuration    |

## 🌐 Deployment

Both frontend and backend are deployed via **Vercel**:  
🔗 Live Site: [https://booknerdstore.vercel.app](https://booknerdstore.vercel.app)

## 🚧 Upcoming Features
- 📰 News/Blog Section
- 👀 View-Only Admin Dashboard for Privileged Users
- 📦 Order Return/Refund System

## 👨💻 Author & Maintenance
**Robert Ncube**  
[![GitHub](https://img.shields.io/badge/GitHub-Robert_Ncube-181717?logo=github)](https://github.com/Robert-Ncube)  
📧 *Contact for support or contributions*

## 📄 License
This project is licensed under the **ISC License** - see [LICENSE](LICENSE) for details.
