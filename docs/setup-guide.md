# Setup Guide

## Backend

Run these commands from the `backend/` directory on Windows.

## Local PostgreSQL Setup On Windows

Install PostgreSQL for Windows from the official PostgreSQL installer:

```text
https://www.postgresql.org/download/windows/
```

During installation:

- Keep the default port as `5432`.
- Remember the password you set for the `postgres` user.
- Install pgAdmin if you want a graphical database manager.

After PostgreSQL is installed, create your backend environment file by copying the example file:

```powershell
Copy-Item .env.example .env
```

Open `backend/.env` and set `DATABASE_URL` using this format:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/edumatch
```

Replace `YOUR_PASSWORD` with your local PostgreSQL password. Do not commit `backend/.env`.

Create the local database with `psql`:

```powershell
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE edumatch;"
```

If PostgreSQL asks for a password, enter the password you created during installation.

Alternative using pgAdmin:

1. Open pgAdmin.
2. Connect to your local PostgreSQL server.
3. Right-click `Databases`.
4. Select `Create` > `Database`.
5. Set the database name to `edumatch`.
6. Save the database.

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Run migrations:

```powershell
alembic upgrade head
```

Run the backend:

```powershell
uvicorn app.main:app --reload
```

Test the backend health endpoint:

```text
http://localhost:8000/health
```

Open the API docs:

```text
http://localhost:8000/docs
```

The current backend phase includes app setup, CORS, database wiring, user/profile models, JWT authentication, and placeholder routers for later features.

## Manual Auth Testing

Open Swagger:

```text
http://localhost:8000/docs
```

Test these endpoints:

```text
POST /auth/register
POST /auth/login
GET /auth/me
GET /users/me
PUT /users/me
```

Student register body:

```json
{
  "full_name": "Ziad Ahmed",
  "email": "ziad@example.com",
  "password": "12345678",
  "role": "student",
  "phone": "01005154081",
  "education_level": "Engineering Student"
}
```

Instructor register body:

```json
{
  "full_name": "Sarah Jenkins",
  "email": "sarah@example.com",
  "password": "12345678",
  "role": "instructor",
  "phone": "01000000000",
  "specialization": "React Instructor"
}
```

Use the returned bearer token from `/auth/login` to authorize `/auth/me` and `/users/me` in Swagger.
