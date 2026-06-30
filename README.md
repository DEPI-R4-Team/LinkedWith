# EduMatch

EduMatch is a graduation project web platform that connects students with instructors. Students will be able to create learning requests, instructors will be able to apply, and accepted matches will later support chat, scheduling, simulated escrow payments, and reviews.

This repository currently contains the initial monorepo structure only. Features are intentionally not implemented yet.

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Router
- Axios

### Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT authentication planned for a later phase

## Repository Structure

```text
frontend/   React client application
backend/    FastAPI server application
docs/       Planning and setup documentation
```

## Backend Setup

Run these commands from the `backend/` directory on Windows.

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
createdb -U postgres edumatch
alembic upgrade head
uvicorn app.main:app --reload
```

Open:

```text
http://localhost:8000/docs
```

Health check:

```text
http://localhost:8000/health
```

## Current Status

- Initial folders created
- Backend base setup added with FastAPI, CORS, config, database session wiring, and placeholder routers
- User/profile models and JWT authentication endpoints added
- No product features implemented yet
- No real payment integration
- No WebSockets

## Planned Capabilities

- Student learning requests
- Instructor applications
- Normal, instant, and group requests
- Group price discounts
- Simulated escrow payments
- Chat
- Session scheduling
- Reviews
- Admin dashboard

## Next Step

Connect the frontend login/register pages to the backend auth endpoints.
