# AI Reception

AI Reception is a full-stack web application for managing an AI receptionist for businesses such as dental clinics, hotels, and repair shops.

The application allows users to manage businesses, clients, services, dialogue scripts, and call sessions. It also includes a call simulator where a virtual receptionist responds to customer messages using the selected business's services and dialogue script.

## Features

- User registration and login with JWT authentication
- Password reset by email
- Business management
- Client management
- Service templates
- Many-to-many relationship between businesses and services
- Custom service prices for each business
- Dialogue scripts with greetings and objection handling
- Call session management
- AI receptionist simulator
- Automatic call result detection:
  - `booked`
  - `rejected`
  - `callback_requested`
- Conversation history stored in the database
- Protected API routes
- Responsive dashboard interface

## AI Reception Simulator

The Simulator demonstrates the main AI receptionist workflow.

A user selects a business and starts a simulated call. The receptionist uses:

- the business dialogue script
- the business services
- service prices
- predefined conversation rules

The simulator can:

- greet the customer
- answer questions about prices
- handle objections
- suggest services
- recognize booking intent
- recognize rejection
- recognize callback requests
- automatically update the call result

The current implementation uses rule-based dialogue logic. The dialogue service is separated from the controller, so it can later be replaced by an external LLM or AI API without changing the main call-session logic.

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
- Sequelize
- MySQL
- JWT
- bcryptjs
- Nodemailer

## Project Structure

```text
ai-reception-project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── entities/
│   │   ├── pages/
│   │   ├── shared/
│   │   └── widgets/
│   └── package.json
│
└── README.md
```

## Database Models

The main database models are:

- `User`
- `Business`
- `Client`
- `ServiceTemplate`
- `BusinessService`
- `CallSession`
- `DialogueScript`
- `Message`

### Main Relationships

```text
User 1 ─── N Business

Business 1 ─── N Client

Business 1 ─── N CallSession

Client 1 ─── N CallSession

Business 1 ─── N DialogueScript

Business N ─── N ServiceTemplate
             through BusinessService

CallSession 1 ─── N Message
```

`BusinessService` stores additional information for the many-to-many relationship, including the service price and custom description.

## Environment Variables

Create a file:

```text
backend/.env
```

Use `backend/.env.example` as a template.

Required variables:

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
PORT=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

Never commit the real `.env` file to Git.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/HGFDS111/ai-reception-project.git
cd ai-reception-project
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then enter your MySQL, JWT, and SMTP credentials.

### 4. Create the MySQL database

Create a MySQL database matching the value of `DB_NAME` in `.env`.

For example:

```sql
CREATE DATABASE ai_reception;
```

Sequelize creates and synchronizes the application tables when the backend starts.

### 5. Start the backend

```bash
npm run dev
```

The API runs by default at:

```text
http://localhost:5000
```

You can verify it with:

```bash
curl http://localhost:5000/
```

Expected response:

```text
AI Reception API is running
```

### 6. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start the frontend

```bash
npm run dev
```

The frontend runs by default at:

```text
http://localhost:5173
```

## Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Businesses

```text
/api/business
```

### Clients

```text
/api/clients
```

### Services

```text
/api/service-templates
/api/business
```

### Dialogue Scripts

```text
/api/dialogue-scripts
```

### Calls

```text
/api/calls
```

### Simulator

```text
POST /api/calls/simulate
POST /api/calls/:id/messages
GET  /api/calls/:id/messages
```

## Authentication

Protected routes require a JWT access token.

The token must be sent using the Authorization header:

```text
Authorization: Bearer <token>
```

Password-reset tokens contain a separate `purpose` value and cannot be used as normal authentication tokens.

## Development Commands

### Backend

```bash
npm run dev
```

Start with Nodemon.

```bash
npm start
```

Start with Node.js.

### Frontend

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Create a production build.

```bash
npm run lint
```

Run ESLint.

## Current Simulator Architecture

The main dialogue logic is located in:

```text
backend/services/dialogue.service.js
```

The controller is responsible for:

1. validating the current user
2. creating or finding the client
3. creating a call session
4. saving client messages
5. calling the dialogue service
6. saving assistant messages
7. updating the call result

This separation makes it possible to replace the current rule-based dialogue engine with a real AI model later.

## License

This project was created as an educational full-stack project.