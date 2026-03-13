# Notes App Frontend

This project is the frontend for a notes application built with React
and Vite.

It allows users to create an account, log in, and manage their personal
notes through a simple interface. The frontend communicates with a
backend API to store and retrieve notes.

Users can create notes, update them, delete them, and pin important
notes.



# Features

Main features of the application:

-   User registration
-   User login
-   Email verification
-   Create notes
-   Edit notes
-   Delete notes
-   Pin and unpin notes
-   View notes with pagination
-   Authentication using tokens
-   Notifications for actions and errors

Each user only sees their own notes.



# Tech Stack

This project uses the following technologies:

-   React
-   Vite
-   Redux Toolkit
-   React Router
-   Axios
-   React Hook Form
-   Yup validation
-   Bootstrap / React Bootstrap
-   React Toastify
-   date-fns for date formatting



# Backend API

This frontend connects to the Notes App backend API.

Example API base URL:
```
http://localhost:5000/api/v1
```
Example endpoints used:
```
POST /auth/create-account
POST /auth/login
POST /auth/verify-email

GET /notes
POST /notes
PATCH /notes/:id
DELETE /notes/:id
PATCH /notes/:id/update-pin
```

# Demo Credentials
- **Email** - `demo.user1.chariot057@aleeas.com`
- **Password** - `demo@1234`


# Environment Setup

Create a `.env` file in the project root.

Example:
```
VITE_API_URL=http://localhost:5000/api/v1
```
This variable defines the backend API URL used by Axios.



# Getting Started

Clone the repository
```
git clone https://github.com/vipulsawant8/notes-app-frontend.git
```
Install dependencies
```
npm install
```
Run the development server
```
npm run dev
```
The app will start on:
```
http://localhost:5173
```


# Build for Production

Create a production build:
```
npm run build
```
Preview the production build:
```
npm run preview
```

# Project Purpose

This project was created to practice:

-   React application development
-   Redux state management
-   API integration
-   Authentication flows
-   Form validation
-   Building a full stack application



# License

ISC License
