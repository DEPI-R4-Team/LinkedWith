# Project Requirements

## Project Name

EduMatch

> A web platform that connects students with suitable instructors through normal requests, instant sessions, group learning, chat, simulated escrow payments, reviews, and admin management.

---

## 1. Project Overview

EduMatch is a graduation project web application designed to make finding instructors easier and more organized.

Students can create learning requests for subjects or skills they need help with. Instructors can browse requests and apply to teach. Students can compare applications and choose the most suitable instructor.

The platform also supports instant requests, where a student can request urgent help and the first available instructor in the same subject can accept the session.

The project includes a simulated escrow payment system where the student pays after an instructor accepts the request. The money is held by the platform until the session is completed, then released to the instructor.

---

## 2. Problem Statement

Students often face difficulty finding qualified instructors quickly. They may need to ask friends, search manually, compare prices without clear information, and contact many people before finding the right instructor.

There is also no organized way to handle urgent learning needs, group learning requests, payment protection, reviews, and instructor verification in one simple platform.

---

## 3. Project Goal

The goal of the project is to build a complete educational marketplace platform that allows:

* Students to find instructors easily
* Instructors to find students
* Students to request urgent instant sessions
* Students to invite classmates to group sessions
* Group sessions to reduce the price per student
* Payments to be simulated and held safely until session completion
* Admins to manage the platform and solve disputes

---

## 4. Target Users

### Student

A student is a user who needs help learning a subject or skill.

Students can:

* Register and login
* Create learning requests
* Create instant requests
* Create group requests
* Invite other students to group requests
* Accept instructor applications
* Pay simulated session fees
* Chat with instructors
* Join sessions
* Confirm session completion
* Review instructors

---

### Instructor

An instructor is a user who teaches students.

Instructors can:

* Register and login
* Complete instructor profile
* Browse student requests
* Apply to normal requests
* Turn on availability for instant requests
* Accept instant requests
* Chat with students
* Manage sessions
* Mark sessions as completed
* View wallet balance
* Receive simulated payment after session completion
* View ratings and reviews

---

### Admin

An admin is the platform manager.

Admins can:

* Manage users
* Verify instructors
* Monitor requests
* Monitor sessions
* Manage simulated payments
* Release or refund payments
* Handle reports and disputes
* Manage reviews
* Edit platform settings

---

## 5. User Roles

The system has three roles:

```txt
student
instructor
admin
```

Each role has a separate dashboard and different permissions.

---

## 6. Main Features

## 6.1 Authentication

The platform must support:

* Register
* Login
* Logout
* Role-based routing
* Protected dashboard pages

User roles:

* Student
* Instructor
* Admin

After login:

```txt
student → /student/dashboard
instructor → /instructor/dashboard
admin → /admin/dashboard
```

---

## 6.2 Student Profile

Student profile includes:

* Full name
* Email
* Phone number
* Education level
* Bio
* Profile image placeholder
* Joined date

---

## 6.3 Instructor Profile

Instructor profile includes:

* Full name
* Email
* Phone number
* Specialization
* Skills
* Experience
* Bio
* Price per session
* Rating
* Verification status
* Availability for instant sessions
* Profile image placeholder

Instructor verification statuses:

```txt
pending_verification
verified
rejected
suspended
```

---

## 6.4 Normal Request Flow

Normal request is the standard request flow.

### Flow

```txt
Student creates a normal request
↓
Request appears for matching instructors
↓
Instructor applies to request
↓
Student reviews applications
↓
Student accepts one instructor
↓
Payment is required
↓
Student pays simulated amount
↓
Payment is held by the platform
↓
Session becomes available
↓
Student and instructor chat
↓
Session is completed
↓
Student confirms completion
↓
Payment is released to instructor
↓
Student reviews instructor
```

---

## 6.5 Instant Request Flow

Instant request is used when a student needs help immediately.

### Flow

```txt
Student creates an instant request
↓
System finds available instructors in the same subject
↓
Matching instructors receive instant notifications
↓
First instructor to accept gets the request
↓
Other instructors cannot accept it
↓
Payment is required
↓
Student pays simulated amount
↓
Payment is held
↓
Session starts
↓
Session is completed
↓
Payment is released to instructor
```

### Important Rules

* Only verified instructors can receive instant requests.
* Instructor must be available for instant sessions.
* Instructor must match the requested subject.
* Instructor must not already be in an active session.
* Only the first instructor who accepts gets the session.
* Instant request should expire after a set time.

---

## 6.6 Group Request Flow

Group request allows one student to invite other students to the same session.

### Flow

```txt
Student creates group request
↓
Student invites other students
↓
Students join request
↓
Price per student is recalculated
↓
Instructor applies or accepts
↓
Student accepts instructor
↓
Each joined student pays their share
↓
Platform holds all payments
↓
Group session starts
↓
Session is completed
↓
Payment is released to instructor
↓
Each student can review instructor
```

### Group Pricing Rule

With each added student, the price per student decreases by a percentage.

The price cannot go below a minimum price.

Formula:

```txt
final_price_per_student =
max(base_price * (1 - discount_rate * (students_count - 1)), minimum_price)
```

Example:

```txt
Base price = 100 EGP
Discount per extra student = 10%
Minimum price = 70 EGP
```

| Students | Price per Student | Instructor Total |
| -------: | ----------------: | ---------------: |
|        1 |           100 EGP |          100 EGP |
|        2 |            90 EGP |          180 EGP |
|        3 |            80 EGP |          240 EGP |
|        4 |            70 EGP |          280 EGP |
|        5 |            70 EGP |          350 EGP |

---

## 6.7 Applications

Instructors can apply to normal requests.

Application contains:

* Request ID
* Instructor ID
* Message
* Proposed price
* Status
* Created date

Application statuses:

```txt
pending
accepted
rejected
```

---

## 6.8 Sessions

A session is created after an instructor is accepted and payment is completed or held.

Session contains:

* Request
* Student
* Instructor
* Session type
* Session mode
* Date/time
* Status
* Payment status
* Chat access

Session statuses:

```txt
ready
active
completed
cancelled
disputed
```

---

## 6.9 Chat

The platform must support simple chat between student and instructor.

For MVP:

* Use database-based messages
* Use frontend polling
* Do not use WebSockets at the beginning

Chat supports:

* One-to-one chat
* Group chat for group sessions
* Message list
* Message input
* Send button
* Session info card

---

## 6.10 Payment Simulation / Escrow

The project must use simulated payments only.

No real payment gateway should be integrated in the MVP.

### Payment Flow

```txt
Instructor accepts request
↓
Student pays
↓
Payment status becomes held
↓
Platform holds the money
↓
Session is completed
↓
Student confirms completion
↓
Payment status becomes released
↓
Instructor wallet balance increases
```

Payment statuses:

```txt
pending
held
released
refunded
cancelled
disputed
```

Payment contains:

* Student
* Instructor
* Request
* Session
* Amount
* Platform fee
* Total amount
* Status
* Paid date
* Released date
* Refunded date

---

## 6.11 Instructor Wallet

Instructor wallet shows simulated earnings.

Wallet contains:

* Pending balance
* Available balance
* Total earned
* Withdraw simulation button
* Transaction history

Transaction types:

```txt
hold
release
refund
withdraw
```

---

## 6.12 Reviews and Ratings

Students can review instructors after session completion.

Review contains:

* Student
* Instructor
* Session
* Rating from 1 to 5
* Comment
* Date
* Status

For group sessions, each student can submit a separate review.

---

## 6.13 Reports and Disputes

Users can report problems.

Examples:

* Instructor did not attend
* Student did not attend
* Bad behavior
* Payment issue
* Session issue
* Fake profile

Report statuses:

```txt
open
under_review
resolved
rejected
```

Admin can:

* View reports
* Resolve reports
* Refund student
* Release payment to instructor
* Suspend user if needed

---

## 6.14 Notifications

Notifications are used for:

* Instructor application received
* Application accepted
* Instant request received
* Payment required
* Payment held
* Payment released
* Session completed
* Report update
* Instructor verification update

For MVP:

* Use database notifications
* Use frontend polling
* Do not use push notifications

---

## 6.15 Admin Dashboard

Admin dashboard includes:

* Total students
* Total instructors
* Pending instructor verifications
* Active requests
* Instant requests today
* Group requests
* Completed sessions
* Held payments
* Released payments
* Open disputes
* Total platform revenue

Admin pages:

* Dashboard
* Users
* Instructor Verification
* Requests
* Sessions
* Payments
* Wallets
* Disputes / Reports
* Reviews
* Platform Settings

---

## 7. Website Pages

## 7.1 Public Pages

* Landing Page
* Login Page
* Register Page

---

## 7.2 Student Pages

* Student Dashboard
* Create Request
* My Requests
* Request Details
* Instant Request Waiting Page
* Group Invite Page
* Payment Page
* Payment Success Page
* Chat Page
* Sessions Page
* Reviews Page
* Profile Settings Page

---

## 7.3 Instructor Pages

* Instructor Dashboard
* Browse Requests
* Request Details
* Apply to Request
* My Applications
* Instant Request Notifications
* Sessions Page
* Chat Page
* Wallet Page
* Reviews Page
* Profile Settings Page

---

## 7.4 Admin Pages

* Admin Dashboard
* Users Management
* Instructor Verification
* Requests Management
* Sessions Management
* Payments Management
* Wallets Management
* Reports / Disputes Management
* Reviews Management
* Platform Settings

---

## 8. UI Requirements

The UI must be:

* Dark mode by default
* Clean and modern
* Simple and not crowded
* Desktop-first
* Responsive for tablets and mobile
* Consistent across all dashboards
* Suitable for a graduation project

Use:

* Sidebar navigation
* Cards
* Tables
* Modals
* Status badges
* Forms
* Search bars
* Filters
* Empty states
* Loading states

Avoid:

* Too many colors
* Random design styles
* Complex animations
* Unnecessary pages
* Generic AI-looking layouts
* Overcrowded dashboards

---

## 9. Recommended Tech Stack

## Frontend

```txt
React
Vite
TypeScript
Tailwind CSS
ShadCN UI
React Router
Axios
React Hook Form
Zod
Lucide React Icons
```

---

## Backend

```txt
FastAPI
SQLAlchemy
Alembic
PostgreSQL
Pydantic
JWT Authentication
Uvicorn
```

---

## Deployment

Later deployment options:

```txt
Frontend: Vercel
Backend: Render / Railway
Database: Supabase PostgreSQL / Neon / Railway PostgreSQL
```

---

## 10. Database Tables

## MVP Tables

Start with:

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

---

## Full Project Tables

Add later:

```txt
request_participants
request_invitations
instructor_wallets
wallet_transactions
notifications
reports
platform_settings
```

---

## 11. Suggested Database Fields

## users

```txt
id
full_name
email
password_hash
role
status
created_at
updated_at
```

---

## student_profiles

```txt
id
user_id
phone
education_level
bio
profile_image
created_at
updated_at
```

---

## instructor_profiles

```txt
id
user_id
phone
specialization
skills
experience
bio
price_per_session
rating
verification_status
is_available_for_instant
last_seen_at
created_at
updated_at
```

---

## requests

```txt
id
student_id
subject
title
description
level
request_type
session_mode
session_type
preferred_datetime
base_price
discount_per_extra_student
minimum_price
final_price_per_student
max_students
status
accepted_instructor_id
expires_at
created_at
updated_at
```

Request type:

```txt
normal
instant
```

Session mode:

```txt
individual
group
```

Session type:

```txt
online
offline
```

---

## request_participants

```txt
id
request_id
student_id
status
joined_at
created_at
updated_at
```

Participant statuses:

```txt
invited
joined
declined
removed
```

---

## request_invitations

```txt
id
request_id
invited_email
invited_by_student_id
token
status
expires_at
created_at
updated_at
```

---

## applications

```txt
id
request_id
instructor_id
message
proposed_price
status
created_at
updated_at
```

---

## sessions

```txt
id
request_id
student_id
instructor_id
session_mode
session_type
scheduled_at
started_at
ended_at
status
created_at
updated_at
```

---

## messages

```txt
id
session_id
sender_id
message
created_at
updated_at
```

---

## payments

```txt
id
session_id
request_id
student_id
instructor_id
amount
platform_fee
total_amount
status
payment_method
paid_at
released_at
refunded_at
created_at
updated_at
```

---

## instructor_wallets

```txt
id
instructor_id
pending_balance
available_balance
total_earned
updated_at
```

---

## wallet_transactions

```txt
id
instructor_id
payment_id
type
amount
status
created_at
updated_at
```

---

## notifications

```txt
id
user_id
request_id
session_id
type
title
message
is_read
created_at
updated_at
```

---

## reviews

```txt
id
session_id
student_id
instructor_id
rating
comment
status
created_at
updated_at
```

---

## reports

```txt
id
reported_by_id
reported_against_id
session_id
payment_id
reason
description
status
admin_note
created_at
updated_at
```

---

## platform_settings

```txt
id
platform_fee_percentage
default_group_discount_percentage
minimum_price_percentage
maximum_group_students
instant_request_expiration_minutes
instructor_verification_required
created_at
updated_at
```

---

## 12. API Requirements

## Auth

```txt
POST /auth/register
POST /auth/login
GET /auth/me
POST /auth/logout
```

---

## Users

```txt
GET /users/me
PUT /users/me
GET /users/{id}
```

---

## Requests

```txt
POST /requests
GET /requests
GET /requests/my
GET /requests/{id}
PUT /requests/{id}
DELETE /requests/{id}
POST /requests/{id}/cancel
```

---

## Applications

```txt
POST /applications
GET /applications/my
GET /applications/request/{request_id}
PUT /applications/{id}/accept
PUT /applications/{id}/reject
```

---

## Instant Requests

```txt
POST /instant-requests/{request_id}/accept
GET /instant-requests/available
POST /instructors/instant-availability
```

---

## Request Participants

```txt
POST /requests/{request_id}/participants
GET /requests/{request_id}/participants
POST /requests/{request_id}/join
DELETE /requests/{request_id}/participants/{student_id}
```

---

## Sessions

```txt
GET /sessions/my
GET /sessions/{id}
PUT /sessions/{id}/start
PUT /sessions/{id}/complete
PUT /sessions/{id}/cancel
POST /sessions/{id}/confirm-completion
```

---

## Messages

```txt
GET /messages/session/{session_id}
POST /messages
```

---

## Payments

```txt
POST /payments/session/{session_id}/pay
GET /payments/my
GET /payments/session/{session_id}
POST /payments/{payment_id}/release
POST /payments/{payment_id}/refund
```

---

## Wallet

```txt
GET /wallet/instructor
GET /wallet/transactions
POST /wallet/withdraw
```

---

## Reviews

```txt
POST /reviews
GET /reviews/my
GET /reviews/instructor/{instructor_id}
DELETE /reviews/{id}
```

---

## Notifications

```txt
GET /notifications
GET /notifications/unread
PUT /notifications/{id}/read
```

---

## Reports

```txt
POST /reports
GET /reports/my
GET /reports/{id}
```

---

## Admin

```txt
GET /admin/dashboard
GET /admin/users
PUT /admin/users/{id}/suspend
PUT /admin/users/{id}/activate

GET /admin/instructors/pending
PUT /admin/instructors/{id}/approve
PUT /admin/instructors/{id}/reject

GET /admin/requests
GET /admin/sessions
GET /admin/payments
POST /admin/payments/{id}/release
POST /admin/payments/{id}/refund

GET /admin/reports
PUT /admin/reports/{id}/resolve

GET /admin/reviews
PUT /admin/reviews/{id}/hide
DELETE /admin/reviews/{id}

GET /admin/settings
PUT /admin/settings
```

---

## 13. Status Lists

## User Status

```txt
active
suspended
pending
```

---

## Request Status

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

---

## Application Status

```txt
pending
accepted
rejected
```

---

## Session Status

```txt
ready
active
completed
cancelled
disputed
```

---

## Payment Status

```txt
pending
held
released
refunded
cancelled
disputed
```

---

## Instructor Verification Status

```txt
pending_verification
verified
rejected
suspended
```

---

## Report Status

```txt
open
under_review
resolved
rejected
```

---

## 14. MVP Scope

The first working MVP should include:

* Register/login
* Role-based dashboards
* Student creates normal request
* Instructor browses requests
* Instructor applies
* Student accepts instructor
* Session is created
* Simple chat
* Payment simulation
* Session completion
* Payment release
* Student review

---

## 15. Features After MVP

Add after MVP works:

* Group requests
* Group discount pricing
* Request participants
* Instant requests
* Instructor availability toggle
* Notifications
* Admin payments
* Disputes and reports
* Instructor wallet
* Platform settings

---

## 16. Features Not Required in MVP

Do not build these at the beginning:

* Real payment gateway
* Video calls
* WebSockets
* AI features
* Mobile app
* Complex analytics
* Complex search engine
* Real bank withdrawal
* Email sending system

These can be future improvements.

---

## 17. Development Phases

## Phase 1: Repo and Setup

* Create folder structure
* Create frontend app
* Create backend app
* Add documentation
* Add environment examples

---

## Phase 2: Frontend Base

* Landing page
* Login page
* Register page
* Student dashboard layout
* Instructor dashboard layout
* Admin dashboard layout
* Shared sidebar
* Shared navbar
* Protected route placeholders

---

## Phase 3: Authentication

* Register API
* Login API
* JWT token
* Auth context on frontend
* Role-based routing
* Protected routes

---

## Phase 4: Normal Requests

* Student create request
* Student my requests
* Instructor browse requests
* Request details
* Instructor apply
* Student accept/reject application

---

## Phase 5: Sessions and Chat

* Create session after accepted application
* Session pages
* Simple chat with database messages
* Session completion flow

---

## Phase 6: Payment Simulation

* Payment page
* Pay simulation
* Payment held status
* Release payment after completion
* Instructor wallet

---

## Phase 7: Group Requests

* Group request form
* Invite students
* Participants list
* Price calculation
* Group session
* Group payments

---

## Phase 8: Instant Requests

* Instant request creation
* Instructor availability toggle
* Instant notifications
* First instructor accept logic
* Instant request waiting screen

---

## Phase 9: Admin

* Admin dashboard
* Users management
* Instructor verification
* Requests management
* Sessions management
* Payments management
* Reports and disputes
* Reviews management
* Platform settings

---

## Phase 10: Polish and Deployment

* Responsive design
* Loading states
* Error states
* Empty states
* Testing
* Deployment

---

## 18. Success Criteria

The project is successful if:

* A student can register, login, and create a request
* An instructor can register, login, and apply to a request
* A student can accept an instructor
* A session is created
* Student and instructor can chat
* Student can pay simulated money
* Payment is held
* Session can be completed
* Payment is released to instructor
* Student can review instructor
* Admin can monitor and manage platform activity

---

## 19. Presentation Pitch

“Our platform solves the difficulty students face when searching for qualified instructors. Instead of manually contacting many people, students can post a learning request, receive applications from instructors, start instant sessions when urgent, invite classmates for group discounts, and pay safely using an escrow-like system where money is held until the session is completed.”

---

## 20. Academic Note

This project is built for academic and graduation project purposes.

The payment system is a simulation only. It is designed to demonstrate business logic and system flow, not to process real money in the MVP version.
