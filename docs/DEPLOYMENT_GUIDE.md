# EduMatch Deployment Guide

## Recommended Hosting

- Frontend: Vercel
- Backend: Render or Railway
- Database: Neon or Supabase PostgreSQL

Use a hosted PostgreSQL database for deployment. Do not use local PostgreSQL for production.

## Backend Environment Variables

Set these variables in the backend hosting dashboard:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
SECRET_KEY=change_this_to_a_strong_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

Do not commit real secrets. Keep production values only in the hosting provider environment settings.

## Frontend Environment Variables

Set this variable in the frontend hosting dashboard:

```env
VITE_API_BASE_URL=https://your-backend-domain.onrender.com
```

The frontend uses `VITE_API_BASE_URL` for API calls. Update it whenever the deployed backend URL changes.

## Backend Deploy Steps

1. Create a hosted PostgreSQL database.
2. Set backend environment variables.
3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations against the hosted database:

```bash
alembic upgrade head
```

5. Start the backend:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Check:

- `/health`
- `/docs`

## Frontend Deploy Steps

1. Set `VITE_API_BASE_URL` to the deployed backend URL.
2. Install dependencies:

```bash
npm install
```

3. Build the frontend:

```bash
npm run build
```

4. Use this output directory:

```txt
dist
```

## CORS

Set backend `FRONTEND_URL` to the deployed frontend origin exactly, for example:

```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

If this value is wrong, browser requests from the frontend may be blocked.

## Production Admin Account

Create the first admin account manually with the optional script:

```bash
ADMIN_EMAIL=admin@example.com ADMIN_FULL_NAME="EduMatch Admin" ADMIN_PASSWORD="replace-with-strong-password" python scripts/create_admin.py
```

On Windows PowerShell:

```powershell
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_FULL_NAME="EduMatch Admin"
$env:ADMIN_PASSWORD="replace-with-strong-password"
python scripts/create_admin.py
```

The script does not contain credentials. It reads values from environment variables, hashes the password, and creates the admin only if the email does not already exist.

## Final Pre-Demo Checklist

- Hosted PostgreSQL is created.
- Backend environment variables are set.
- Frontend environment variables are set.
- `alembic upgrade head` has run on the hosted database.
- `/health` returns a successful response.
- `/docs` loads.
- First admin account is created safely.
- Student, instructor, and admin login are tested.
- Normal, group, and instant request flows are tested.
- Simulated payments, chat, reviews, notifications, and admin actions are tested.
