# Project Rules

## 1. Project Overview

This project is a graduation project web platform that connects students with instructors.

Students can create learning requests, instructors can apply or accept instant requests, students can chat and schedule sessions, payments are simulated and held by the platform until session completion, and admins manage users, requests, payments, and disputes.

The project must stay simple, clean, realistic, and suitable for a university graduation project.

---

## 2. Tech Stack

### Frontend

Use only:

* React
* Vite
* TypeScript
* Tailwind CSS
* ShadCN UI
* React Router
* Axios
* React Hook Form
* Zod
* Lucide React Icons

### Backend

Use only:

* FastAPI
* SQLAlchemy
* Alembic
* PostgreSQL
* Pydantic
* JWT Authentication
* Uvicorn

### Do Not Use Unless Asked Later

Do not use:

* Next.js
* MongoDB
* Firebase
* GraphQL
* Real payment gateway
* WebSockets at the beginning
* AI features
* Microservices
* Redux unless absolutely necessary
* Docker unless deployment phase starts

---

## 3. Development Order

Do not build all features at once.

Follow this order:

1. Project folder structure
2. Frontend base setup
3. Routing and layouts
4. Authentication pages
5. Role-based dashboards
6. Backend base setup
7. Authentication API
8. Normal request flow
9. Instructor applications
10. Sessions
11. Simple chat
12. Escrow payment simulation
13. Instructor wallet
14. Group requests
15. Instant requests
16. Admin dashboard
17. Reviews
18. Reports and disputes
19. Responsive polish
20. Deployment

---

## 4. User Roles

The system has three main roles:

### Student

Student can:

* Register and login
* Create normal requests
* Create instant requests
* Create group requests
* Invite students to group requests
* Accept instructor applications
* Pay simulated session fees
* Chat with instructor
* Confirm session completion
* Review instructor

### Instructor

Instructor can:

* Register and login
* Complete instructor profile
* Browse student requests
* Apply to normal requests
* Toggle availability for instant sessions
* Accept instant requests
* Chat with students
* Manage sessions
* Mark sessions as completed
* View wallet balance
* View reviews

### Admin

Admin can:

* View platform statistics
* Manage users
* Verify instructors
* Monitor requests
* Monitor sessions
* Manage simulated payments
* Release or refund payments
* Handle reports and disputes
* Hide or delete reviews
* Edit platform settings

---

## 5. Main Features

### Normal Request Flow

Student creates a request.

Instructors apply.

Student compares applications.

Student accepts one instructor.

Session is created.

Student pays.

Payment is held.

Session happens.

Student confirms completion.

Payment is released to instructor.

Student reviews instructor.

---

### Instant Request Flow

Student creates an instant request.

System finds available instructors in the same field.

Matching instructors receive notifications.

The first instructor to accept gets the session.

Other instructors cannot accept after that.

Student pays.

Payment is held.

Session starts.

Payment is released after session completion.

---

### Group Request Flow

Student creates a group request.

Student invites other students.

Each joined student reduces the price per student by a small percentage.

The price cannot go below the minimum price.

Instructor sees:

* Number of students
* Price per student
* Total expected earnings

Each student pays their share.

Payment is held until session completion.

Each student can review the instructor.

---

### Escrow Payment Simulation

This project uses simulated payments only.

No real payment gateway should be integrated unless explicitly requested.

Payment statuses:

* pending
* held
* released
* refunded
* cancelled
* disputed

Money flow:

1. Instructor accepts request
2. Student pays
3. Platform holds money
4. Session is completed
5. Student confirms completion
6. Money is released to instructor wallet

---

## 6. UI Rules

The UI must be:

* Dark mode by default
* Clean and simple
* Modern SaaS dashboard style
* Desktop-first
* Responsive for tablets and mobiles
* Consistent across all roles
* Not crowded
* Easy to understand
* Suitable for a graduation project

Use:

* Cards
* Tables
* Modals
* Status badges
* Sidebar navigation
* Simple forms
* Clear buttons
* Empty states
* Loading states

Avoid:

* Too many colors
* Random icons
* Generic AI-looking sections
* Overcomplicated layouts
* Large unnecessary animations
* Inconsistent spacing
* Inconsistent button styles

---

## 7. Design Rules

Keep the same visual identity across the whole project.

Use:

* Dark background
* One main accent color
* Rounded cards
* Subtle borders
* Soft shadows
* Clear text hierarchy
* Consistent spacing
* Professional typography

Every dashboard should have:

* Sidebar
* Page title
* Short page description
* Main action button if needed
* Cards or tables
* Status badges

---

## 8. Frontend Folder Rules

Use this frontend structure:

```txt
frontend/src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── cards/
│   ├── forms/
│   ├── tables/
│   └── modals/
├── pages/
│   ├── public/
│   ├── auth/
│   ├── student/
│   ├── instructor/
│   ├── admin/
│   └── shared/
├── services/
├── types/
├── hooks/
├── lib/
└── utils/
```

Rules:

* Pages should stay clean and use reusable components.
* Do not put large logic inside page components.
* API calls must be inside `services/`.
* Shared TypeScript types must be inside `types/`.
* Reusable UI parts must be inside `components/`.
* Layout components must be inside `components/layout/`.
* Do not duplicate components if they can be reused.

---

## 9. Backend Folder Rules

Use this backend structure:

```txt
backend/app/
├── main.py
├── database.py
├── config.py
├── models/
├── schemas/
├── routers/
├── services/
├── utils/
└── dependencies/
```

Rules:

* Database models go inside `models/`.
* Pydantic schemas go inside `schemas/`.
* API endpoints go inside `routers/`.
* Business logic goes inside `services/`.
* Reusable dependencies go inside `dependencies/`.
* Helper functions go inside `utils/`.
* Do not put all backend code in `main.py`.

---

## 10. Naming Rules

Use clear names.

Good examples:

```txt
CreateRequestPage
StudentDashboardPage
InstructorWalletPage
AdminPaymentsPage
RequestDetailsPage
PaymentStatusBadge
SessionCard
ApplicationTable
```

Bad examples:

```txt
Page1
TestComponent
NewComp
Card2
FinalPage
```

Use consistent route names:

```txt
/student/dashboard
/student/requests
/student/requests/create
/student/payments

/instructor/dashboard
/instructor/requests
/instructor/applications
/instructor/wallet

/admin/dashboard
/admin/users
/admin/requests
/admin/payments
```

---

## 11. Status Rules

Use these request statuses:

```txt
open
pending_instant
accepted
waiting_payment
paid
in_session
completed
cancelled
expired
```

Use these application statuses:

```txt
pending
accepted
rejected
```

Use these session statuses:

```txt
ready
active
completed
cancelled
disputed
```

Use these payment statuses:

```txt
pending
held
released
refunded
cancelled
disputed
```

Use these instructor statuses:

```txt
pending_verification
verified
rejected
suspended
```

Use these dispute statuses:

```txt
open
under_review
resolved
rejected
```

---

## 12. Database Rules

Start with the MVP tables first:

```txt
users
student_profiles
instructor_profiles
requests
applications
sessions
messages
payments
reviews
```

Add these later:

```txt
request_participants
request_invitations
instructor_wallets
wallet_transactions
notifications
reports
platform_settings
```

Do not create unnecessary tables.

Use relationships properly.

Use PostgreSQL IDs and timestamps.

Every main table should include:

```txt
id
created_at
updated_at
```

---

## 13. API Rules

Use REST API style.

Examples:

```txt
POST /auth/register
POST /auth/login
GET /auth/me

POST /requests
GET /requests
GET /requests/my
GET /requests/{id}

POST /applications
GET /applications/my
PUT /applications/{id}/accept
PUT /applications/{id}/reject

GET /sessions/my
PUT /sessions/{id}/complete

POST /payments/session/{session_id}/pay
POST /payments/{payment_id}/release
POST /payments/{payment_id}/refund
```

Rules:

* Protect private routes with authentication.
* Check user role before allowing actions.
* Students should not access instructor-only actions.
* Instructors should not access student-only actions.
* Admin routes should only be accessible by admins.

---

## 14. Authentication Rules

Use JWT authentication.

User roles:

```txt
student
instructor
admin
```

After login:

```txt
student → /student/dashboard
instructor → /instructor/dashboard
admin → /admin/dashboard
```

Do not allow users to access dashboards that do not match their role.

---

## 15. Payment Rules

Payments are simulated.

Do not integrate Stripe, PayPal, Fawry, Paymob, or any real payment provider unless explicitly requested.

When student pays:

```txt
payment.status = held
```

When session is completed and confirmed:

```txt
payment.status = released
```

If session is cancelled:

```txt
payment.status = refunded
```

Instructor wallet should show:

```txt
pending_balance
available_balance
total_earned
```

---

## 16. Instant Request Rules

Instant requests should only notify instructors who are:

* In the same field or subject
* Available for instant sessions
* Verified
* Not suspended
* Not already in an active session

Only the first instructor who accepts gets the session.

If another instructor tries to accept after that, show:

```txt
This instant request has already been accepted by another instructor.
```

Use polling first.

Do not use WebSockets at the start.

---

## 17. Group Request Rules

Group requests must include:

* Maximum number of students
* Joined students list
* Price per student
* Minimum price
* Total instructor earnings

Price formula:

```txt
final_price_per_student =
max(base_price * (1 - discount_rate * (students_count - 1)), minimum_price)
```

Rules:

* Price cannot go below minimum price.
* Only joined students count in price calculation.
* The request creator can invite students.
* The request creator can remove students before payment.
* After payment starts, changing group members should be restricted.
* Each student pays their own share.
* Each student can review the instructor after completion.

---

## 18. Admin Rules

Admin should not act as student or instructor.

Admin is the platform manager.

Admin can:

* View all users
* Suspend users
* Verify instructors
* View all requests
* View all sessions
* View all payments
* Release or refund simulated payments
* Handle disputes
* Hide or delete reviews
* Edit platform settings

Admin should not:

* Create learning requests
* Apply to requests
* Join sessions as a normal participant

---

## 19. Code Quality Rules

Always:

* Write clean, readable code
* Use TypeScript types in frontend
* Use Pydantic schemas in backend
* Use reusable components
* Keep files focused
* Avoid huge files
* Use meaningful names
* Handle loading states
* Handle error states
* Validate forms
* Keep UI consistent

Never:

* Generate unrelated features
* Change the tech stack without permission
* Add unnecessary dependencies
* Mix frontend and backend logic
* Put secrets inside code
* Hardcode API URLs except through environment variables
* Build real payment integration
* Build AI features unless requested

---

## 20. Environment Rules

Use environment variables.

Frontend:

```txt
VITE_API_BASE_URL=http://localhost:8000
```

Backend:

```txt
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Never commit real `.env` files.

Only commit `.env.example`.

---

## 21. Git Rules

Use clear commits.

Examples:

```txt
feat: initialize frontend structure
feat: add auth pages
feat: add student request flow
fix: correct payment status badge
refactor: split dashboard components
```

Do not commit:

* `.env`
* `node_modules`
* Python cache files
* build folders
* temporary test files

---

## 22. Testing Rules

Before saying a feature is complete, check:

* Page loads without errors
* Routes work
* Forms validate required fields
* Buttons perform the expected action
* Role protection works
* API errors are displayed clearly
* Mobile layout does not break
* No console errors

---

## 23. MVP Priority

The MVP must include:

* Register/login
* Role-based dashboards
* Student creates normal request
* Instructor applies
* Student accepts instructor
* Session is created
* Simple chat
* Payment simulation
* Session completion
* Review instructor

After MVP works, add:

* Group requests
* Instant requests
* Admin payments
* Disputes
* Advanced UI polish

---

## 24. Main Instruction for AI Coding Tools

When using Cursor or any AI coding tool:

Do not generate the whole app at once.

Work feature by feature.

Before making changes:

1. Read this `rules.md`
2. Follow the existing folder structure
3. Keep the same design system
4. Reuse existing components
5. Do not add unnecessary libraries
6. Explain what files were changed
7. Keep the code simple and maintainable

---

## 25. Final Goal

The final project should feel like a complete educational marketplace platform with:

* Clean student experience
* Clean instructor experience
* Admin management
* Simulated payment protection
* Group learning support
* Instant help request support
* Professional dark-mode UI
* Clear graduation project documentation
