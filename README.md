# Student REST API

A RESTful API built with Node.js, Express.js, and PostgreSQL for managing student records.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- REST API
- Git & GitHub

## Features

- Create a new student
- Get all students
- Get a student by ID
- Update student details
- Delete a student
- PostgreSQL database integration
- Environment variable configuration

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a student by ID |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ananyadash0/student-api.git
cd student-api

### 2. Install dependencies

```bash
npm install

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=student_api
DB_PASSWORD=your_postgresql_password
DB_PORT=5432

### 4. Start the server

```bash
node server.js

## API Usage

### Get all students

```http
GET /api/students
```

### Get a student by ID

```http
GET /api/students/1
```

### Add a new student

```http
POST /api/students
```

Request body:

```json
{
  "name": "Suman",
  "course": "MCA"
}
```

### Update a student

```http
PUT /api/students/1
```

Request body:

```json
{
  "name": "Ananya Dash",
  "course": "MCA"
}
```

### Delete a student

```http
DELETE /api/students/1
```
## Project Structure

```text
student-api/
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

### File Description

* `server.js` — Main Express server and API routes
* `.env` — Database configuration and secret credentials
* `.gitignore` — Prevents sensitive and unnecessary files from being uploaded
* `package.json` — Project dependencies and scripts
* `README.md` — Project documentation

## Author

**Ananya Dash**

MCA Graduate | Frontend Developer | Learning Backend Development and Databases

This project was created as part of my journey to strengthen my backend development skills, REST APIs, PostgreSQL, and full-stack web development.
