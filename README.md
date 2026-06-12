# 🔗 URL Shortener

A full-stack URL Shortener web application built using React, Node.js, Express, and MongoDB Atlas. Users can shorten long URLs, track click counts, copy shortened links, and manage URLs through a simple and responsive interface.

## Live Demo

Frontend: https://url-shortener-sigma-sable.vercel.app

## Features

- Shorten long URLs into unique short links
- Redirect shortened URLs to original destinations
- Track click counts for each shortened URL
- URL validation before shortening
- Prevent duplicate URL entries
- Copy shortened URLs to clipboard
- Delete unwanted URLs
- Responsive and clean user interface
- Cloud database storage using MongoDB Atlas

## Tech Stack

### Frontend
- React.js
- Axios
- CSS / Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Project Structure

```bash
url-shortener/
│
├── backend/
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── urlRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

## API Endpoints

### Create Short URL

```http
POST /api/shorten
```

Request Body:

```json
{
  "originalUrl": "https://www.google.com"
}
```

---

### Get All URLs

```http
GET /api/urls
```

---

### Redirect to Original URL

```http
GET /:shortCode
```

Example:

```txt
http://localhost:5001/abc123
```

---

### Delete URL

```http
DELETE /api/urls/:id
```

---

## Screenshots

### Home Page

<img width="2940" height="1620" alt="image" src="https://github.com/user-attachments/assets/26a7ca3f-6bee-4792-9352-7eb70026ef64" />


### URL Created Successfully

<img width="2940" height="1620" alt="image" src="https://github.com/user-attachments/assets/a7ee36ea-b509-4233-b3ae-35e5a3b21610" />



---

## Future Improvements

- Custom URL aliases
- User authentication
- Analytics dashboard
- QR code generation
- Expiring links
- Dark mode support

---

## Author

**Deshika Gupta**

- B.Tech (ECE-AI), IGDTUW
- LeetCode: 700+ Problems Solved
- Full-Stack Web Developer

---

## 📄 License

This project is open-source and available under the MIT License.
