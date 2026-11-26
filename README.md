# EmergencyPay

A full stack app with a React frontend and a Spring Boot backend. Users register and log in, manage deposits and dues, and admins manage users and system configuration.

## Features
- Register and log in (JWT authentication)
- Dashboard with pages to add a deposit, pay a due and request an amount
- Admin page to view users and update system configuration

## Tech Stack
- **Backend:** Java 17, Spring Boot, Spring Security with JWT, Spring Data JPA, PostgreSQL, Maven, Docker
- **Frontend:** React 19, Vite, React Router, Axios

## API Overview

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login` |
| Admin | `GET /api/admin/users`, `GET /api/admin/config`, `PUT /api/admin/config` |
| Config | `GET /api/config` |

## Run Locally

### Backend
Needs JDK 17+ and a PostgreSQL database. Database settings and defaults are in `backend/src/main/resources/application.properties` and can be overridden with environment variables.
```bash
cd backend
mvn spring-boot:run
```
The API runs at `http://localhost:8080` (or `PORT`).

### Frontend
```bash
npm install
npm run dev
```

## Project Structure
```text
backend/src/main/java/com/emergencypay/
├── controller/   # Auth, admin and config endpoints
├── dto/          # Request and response objects
├── model/        # User, Role, SystemConfig
├── repository/   # Data access layer
└── security/     # JWT filter, provider and security config
src/
├── components/   # Dashboard, payment and deposit pages
├── context/      # Auth and app state
├── pages/        # Login, register, admin
└── utils/        # API client
```

Never commit real credentials. Keep them in environment variables.

## Author
Raman Chourasiya. [GitHub](https://github.com/Raman-1166)
