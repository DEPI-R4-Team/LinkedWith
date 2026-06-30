# EduMatch Project Progress

## Project Brief

EduMatch is a web platform that connects students with instructors. Students can create learning requests, instructors can apply, students can accept instructors, sessions are created, payments are simulated through escrow, users can chat, complete sessions, leave reviews, and admins can manage the platform.

This is a graduation-project MVP. Payments are simulated for academic demonstration only and no real money is processed.

## Current Tech Stack

Frontend:
- React
- Vite
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Router
- Axios

Backend:
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Pydantic
- JWT Authentication

## Completed Features

### 1. Authentication and Roles

- User registration is implemented.
- Login is implemented.
- JWT authentication is used.
- Protected frontend routes are implemented.
- Role-based access is implemented for:
  - student
  - instructor
  - admin
- Public admin registration is blocked.
- Suspended users are blocked.

### 2. Student Normal Request Flow

- Students can create normal learning requests.
- Students can view their own requests.
- Students can view request details.
- Students can cancel or update requests where supported.
- Request pages use real backend data, not mock data.

### 3. Instructor Applications

- Instructors can browse open requests.
- Instructors can apply to requests.
- Students can view applications for their own requests.
- Students can accept or reject applications.
- Accepting an instructor creates a session.

### 4. Sessions

- Sessions are created after an accepted application.
- Students and instructors can view their sessions.
- Session details pages exist.
- Sessions can be started.
- Instructors can mark sessions completed.
- Students can confirm completion.

### 5. Simulated Escrow Payments

- Students pay using simulated payment.
- Payment is held in escrow.
- Instructor wallet pending balance increases when payment is held.
- Payment is released after session completion confirmation.
- Wallet available balance and total earned update after release.
- Refund and release logic exists.
- No real payment provider is integrated.

### 6. Chat

- Session chat is database-backed.
- Students and instructors can send and view messages.
- Polling is used.
- WebSockets are not used yet.

### 7. Reviews and Ratings

- Students can review instructors after completed sessions.
- The system allows one review per session/student.
- Instructor rating recalculates from visible reviews.
- Admin can hide or show reviews.

### 8. Instructor Discovery

- Students can browse real registered instructors.
- Students can search and filter instructors.
- Students can view instructor profiles.
- Students can view real reviews for instructors.
- Fake instructor cards have been removed from the main production flow.

### 9. Admin Dashboard

- Read-only admin dashboard is implemented.
- Admin can view:
  - users
  - requests
  - sessions
  - payments
  - reviews
  - platform stats

### 10. Admin Actions

- Admin can verify or reject instructors.
- Admin can suspend or activate users.
- Admin can refund or release held payments.
- Admin can hide or show reviews.
- Admin APIs are protected.

### 11. Notifications

- Database-backed notifications are implemented.
- Users only see their own notifications.
- Notification dropdown/page uses real data.
- Notification polling runs every 30 seconds.
- Notifications are created for important events:
  - instructor applies
  - application accepted/rejected
  - payment held/released/refunded
  - session started/completed
  - review received
  - admin actions

### 12. Group Requests

- Students can create group requests.
- The owner becomes the first participant.
- Other students can join group requests.
- Instructors can apply to group requests.
- The owner can accept an instructor.
- Participants pay their own shares.
- Group pricing formula:
  `price_per_student = max(min_price_per_student, ceil(base_price / active_participants_count))`
- Session becomes ready when all active participants pay.
- Group payments release after completion.
- Normal request flow remains preserved.

### 13. Mock Data Cleanup

- Mock/dummy data was removed from main production pages.
- New users see real empty states.
- Pages use backend APIs where available.

## Important Backend Endpoints Summary

- Auth: `/auth/register`, `/auth/login`, `/auth/me`
- Requests: `/requests`
- Applications: `/applications`
- Sessions: `/sessions`
- Payments: `/payments`
- Wallet: `/wallet`
- Messages: `/messages`
- Reviews: `/reviews`
- Users/Instructors: `/users/instructors`
- Admin: `/admin`
- Notifications: `/notifications`
- Group Requests: `/group-requests`

## Database/Migrations Status

- PostgreSQL is used as the database.
- Alembic migrations are used for database schema changes.
- Current migrations include:
  - users/profiles
  - requests/applications/sessions
  - payments/wallets
  - messages
  - session completion/reviews
  - notifications
  - group requests
- Teammates must run:

```cmd
alembic upgrade head
```

## What Is Not Built Yet

- Instant Requests are NOT implemented yet.
- Deployment is not done yet.
- Real payment gateway is not integrated.
- WebSockets are not used.
- Email/SMS/push notifications are not integrated.
- Admin disputes workflow is not built.
- Group invitation by email is not built.
- Video meeting integration is not built.
- File attachments are not built.
- Production seed/admin creation flow may still need final setup.

## Recommended Next Steps

1. Instant Requests
2. Final UI polish
3. Deployment preparation
4. Production database setup
5. Final testing and presentation data
