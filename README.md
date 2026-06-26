# LinkedWith

LinkedWith is a graduation project web platform that connects students with instructors. Students will be able to create learning requests, instructors will be able to apply, and accepted matches will later support chat, scheduling, simulated escrow payments, and reviews.

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

## Current Status

- Initial folders created
- Placeholder files added so the structure can be committed
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

Initialize the frontend and backend tooling inside the existing `frontend/` and `backend/` folders, then create the first minimal runnable React and FastAPI applications.
