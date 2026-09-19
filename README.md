# The Tales of History

An interactive history and mythology learning platform.

## Stack
- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB
- JWT authentication
- Pluggable AI tutor API

## Run
1. Create `server/.env` from `server/.env.example`.
2. Set `MONGODB_URI` and `JWT_SECRET`. AI is optional; without an AI key the tutor uses a local fallback.
3. Run `npm install`, `npm run install:all`, then `npm run dev`.

Client: http://localhost:5173
Server: http://localhost:5000

## Features
Authentication, personalized dashboard, history/mythology library, topic search, timelines, visual/documentary resources, contextual AI tutoring, summaries, exam notes, related topics, and progress tracking.
