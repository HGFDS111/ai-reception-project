# AI Reception

AI Reception is a full-stack web application for managing and simulating an AI receptionist for different types of businesses.

The application allows users to create businesses, configure services and dialogue scripts, manage clients and call sessions, and test receptionist conversations through an interactive simulator.

The current version is an educational full-stack MVP. The receptionist conversation is simulated inside the web application; real telephone calling is not connected.

## Main Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Business management
- Client management
- Service templates
- Business-specific services and prices
- Dialogue scripts
- Call sessions
- Message history
- AI receptionist conversation simulator
- Protected API routes
- MySQL database
- Docker Compose setup

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- React Router
- CSS Modules

### Backend

- Node.js
- Express
- Sequelize ORM
- JWT
- bcryptjs
- Nodemailer

### Database

- MySQL 8

### Infrastructure

- Docker
- Docker Compose

## Architecture

```text
Browser
   |
   v
React + TypeScript
   |
   | HTTP / JSON
   v
RTK Query
   |
   v
Express API
   |
   v
Controllers
   |
   v
Sequelize ORM
   |
   v
MySQL
```

Docker Compose runs the application as three services:

```text
frontend
   |
   v
backend
   |
   v
db (MySQL)
```

## Database Models

The application contains the following main models:

- User
- Business
- Client
- ServiceTemplate
- BusinessService
- CallSession
- DialogueScript
- Message

### Main Relationships

```text
User 1 ---- N Business

Business 1 ---- N Client

Business 1 ---- N CallSession

Business 1 ---- N DialogueScript

Client 1 ---- N CallSession

CallSession 1 ---- N Message

Business N ---- N ServiceTemplate
               |
               v
        BusinessService
```

`BusinessService` is the junction table used for the many-to-many relationship between businesses and service templates.

It also stores business-specific information such as price and custom description.

## Authentication

Authentication is implemented with JWT.

After login, the backend returns a token. The frontend stores the token and sends it with protected API requests:

```text
Authorization: Bearer <token>
```

Protected backend routes use authentication middleware to validate the token.

Passwords are not stored as plain text. They are hashed using bcrypt before being saved to the database.

## Receptionist Simulator

The Simulator page allows the user to test a receptionist conversation for a selected business.

A simulation creates a call session and stores conversation messages in the database.

The backend can react to different conversation intents, including:

- service and price questions
- booking requests
- objections
- rejection
- callback requests
- fallback questions

Service and pricing responses can use the services assigned to the selected business.

## Run with Docker

### Requirements

Install:

- Git
- Docker Desktop

Node.js and MySQL do not need to be installed separately when the project is started with Docker.

### 1. Clone the repository

```bash
git clone https://github.com/HGFDS111/ai-reception-project.git
cd ai-reception-project
```

### 2. Start the application

```bash
docker compose up -d --build
```

Docker Compose will:

- build the frontend container
- build the backend container
- start MySQL 8
- create the MySQL data volume
- wait until MySQL is healthy
- start the backend
- start the frontend

### 3. Open the application

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

MySQL runs inside the Docker Compose network on port `3306`.

### 4. Create an account

A fresh installation starts with a new database.

Open the application and register a user account before using the dashboard.

### 5. Check running containers

```bash
docker compose ps
```

Expected services:

```text
frontend
backend
db
```

The database service should have a `healthy` status.

### 6. View logs

All services:

```bash
docker compose logs -f
```

Backend:

```bash
docker compose logs -f backend
```

Frontend:

```bash
docker compose logs -f frontend
```

### 7. Stop the application

```bash
docker compose down
```

The MySQL data is stored in a Docker volume, so a normal `docker compose down` does not delete the database.

To start the application again:

```bash
docker compose up -d
```

## Development with Docker

The frontend and backend source directories are mounted into their containers.

This allows source code changes to be detected while the containers are running.

If dependencies or Docker configuration change, rebuild the project:

```bash
docker compose up -d --build
```

## Environment Variables

Example environment files are included in the repository:

```text
backend/.env.example
frontend/.env.example
```

Do not commit real passwords, JWT secrets, SMTP credentials, or other private values.

Docker Compose provides development defaults required to run the core application.

Email-based password recovery requires valid SMTP configuration in:

```text
backend/.env
```

## Useful Docker Commands

Start:

```bash
docker compose up -d
```

Start and rebuild:

```bash
docker compose up -d --build
```

Check status:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop:

```bash
docker compose down
```

## Project Structure

```text
ai-reception-project/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── entities/
│   │   ├── pages/
│   │   ├── shared/
│   │   └── widgets/
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

## Development Status

This project was developed as a full-stack educational project demonstrating:

- relational database design
- REST API development
- CRUD operations
- JWT authentication
- protected routes
- Sequelize relationships
- many-to-many relationships
- React and TypeScript
- RTK Query
- client-side routing
- Docker containerization
