# Clock Homework

## Prerequisites

- Node.js (v18 or higher)
- PHP (v8.1 or higher)
- Composer
- MySQL (v8.0 or higher)
- Docker and Docker Compose (optional, for Docker setup)

## Setup Options

### Option 1: Docker Setup (Recommended)

1. Clone the repository
2. Navigate to the project directory
3. Run the following command:

   ```bash
   docker-compose up --build -d
   ```

4. Access the application:
   - Web interface: <http://localhost:3000>
   - Server API: <http://localhost:8000>
   - phpMyAdmin: <http://localhost:8080>
     - Username: root
     - Password: root

### Option 2: Manual Setup

1. Clone the repository
2. Backend Setup:

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your database credential
   npm run dev
   ```

3. Frontend Setup:

   ```bash
   cd client
   npm install
   npm start
   ```

4. Database Setup:
   - Create a new MySQL database
   - Import the initial SQL file(db folder, datebase there is mdclone so keep an eye on it)
   - Default user credentials:
     - Username: <admin@mdclone.com>
     - Password: 123456

## Development

- Backend runs on: <http://localhost:8000>
- Frontend runs on: <http://localhost:3000>
- API documentation available at: <http://localhost:8000/api/documentation>

## Features

- User authentication
- Role-based access control
- Time tracking
- Manager dashboard
- Employee management

## Troubleshooting

1. Docker issues:

   ```bash
   # Stop all containers
   docker-compose down -v
   
   # Rebuild and start
   docker-compose up --build -d
   ```

2. Database connection issues:
   - Check your .env file credentials
   - Ensure MySQL service is running
   - Verify database exists and is accessible

3. Frontend issues:

   ```bash
   cd client
   npm install
   npm start
   ```
