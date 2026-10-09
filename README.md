# 📝 B's Notes App

A full-stack, responsive note-taking web application built with **React 19**, **Vite**, **Express**, and **PostgreSQL**. Inspired by minimalist note boards, B's Notes lets you capture your thoughts, organize ideas, edit them inline, and persist them securely in a relational database.

---

## ✨ Features

- 📌 **Full CRUD Functionality**:
  - **Create**: Add notes with custom titles and content. Automatic first-letter capitalization and input validation ensure notes stay tidy.
  - **Read**: View all saved notes instantly in reverse chronological order (newest first).
  - **Update**: Seamless inline editing mode with instant save or cancel options.
  - **Delete**: Remove notes with a single click and immediate UI update.
- 🎨 **Clean & Responsive UI**: Custom-styled card layout using modern pastel and mint palette (`#55A9A0`, `#AEEED3`, `#FFF8B0`) and Material UI icons.
- ⚡ **High Performance**: Lightning-fast frontend tooling powered by **Vite** and **React 19**.
- 🗄️ **Robust Persistence**: Powered by **PostgreSQL** via connection pooling (`pg`) for reliable data storage.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components & Icons**: [Material UI (@mui/icons-material, @mui/material)](https://mui.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: Vanilla CSS3

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database Driver**: [node-postgres (`pg`)](https://node-postgres.com/)
- **Middleware**: `cors`, `express.json()`, `express.urlencoded()`
- **Dev Tooling**: [Nodemon](https://nodemon.io/)

### Database
- **Engine**: [PostgreSQL](https://www.postgresql.org/)

---

## 📂 Project Structure

```text
B's_Notes_App/
├── components/
│   ├── app.jsx          # Root React component managing view state & note refreshing
│   ├── header.jsx       # Header bar with app title and Material UI event icon
│   ├── InputForm.jsx    # Note input form with validation & capitalization helpers
│   ├── notes.jsx        # Note card grid, inline edit form, and delete handlers
│   └── footer.jsx       # Footer component
├── index.css            # Global stylesheets and card layouts
├── index.html           # Main HTML entry point
├── index.js             # Express REST API server & PostgreSQL connection pool
├── index.jsx            # React DOM root entry point
├── package.json         # Project dependencies and npm scripts
├── vite.config.js       # Vite configuration with React plugin
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 1. Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (running locally on port `5432`)

---

### 2. Database Setup

1. Start your PostgreSQL service.
2. Open your terminal or `psql` shell and create a database:
   ```sql
   CREATE DATABASE "b task";
   ```
3. Connect to the database:
   ```sql
   \c "b task"
   ```
4. Create the `notes` table:
   ```sql
   CREATE TABLE notes (
       noteid SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL
   );
   ```

> **Note:** If your PostgreSQL username or password differs from the defaults in `index.js`, update the connection credentials in [`index.js`](./index.js):
> ```javascript
> const pool = new Pool({
>     user: 'postgres',         // Your PostgreSQL username
>     host: 'localhost',
>     database: 'b task',       // Your database name
>     password: 'your_password', // Your PostgreSQL password
>     port: 5432,
> });
> ```

---

### 3. Installation

Clone this repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/bharathrajm825/Notes_APP.git

# Navigate into the project directory
cd Notes_APP

# Install dependencies
npm install
```

---

### 4. Running the Application

This project requires running both the **Backend API Server** and the **Vite Frontend Development Server**.

#### Terminal 1: Start Backend Server
```bash
# Start server with Node
node index.js

# Or start with Nodemon for hot-reloading during development
npx nodemon index.js
```
The server will run at: `http://localhost:3000`

#### Terminal 2: Start Frontend Dev Server
```bash
npm run dev
```
The Vite development server will start (typically at `http://localhost:5173`). Open the URL in your browser to start taking notes!

---

## 🔌 API Endpoints

The Express server exposes the following RESTful API routes:

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/` | Fetch all notes sorted by `noteid DESC` | _None_ |
| `POST` | `/` | Create a new note | `{ "title": "My Note", "content": "Note details" }` |
| `PATCH` | `/:id` | Update an existing note by ID | `{ "title": "Updated Title", "content": "Updated Content" }` |
| `DELETE` | `/:id` | Delete a note by ID | _None_ |

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles and bundles production-ready frontend assets.
- `npm run preview`: Locally preview the production build.
- `node index.js`: Runs the Express backend server.

---

## 🔮 Future Enhancements

- [ ] Add `.env` support for sensitive database credentials.
- [ ] Add color tagging and search/filter functionality for notes.
- [ ] Implement user authentication & session management.
- [ ] Add pin-to-top and drag-and-drop ordering for notes.
- [ ] Responsive grid improvements for mobile screens.

---

## 👤 Author

Developed by [**Bharath Raj M**](https://github.com/bharathrajm825)
- Copyright © 2026 Bharath, Inc.
