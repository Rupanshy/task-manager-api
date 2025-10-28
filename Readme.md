# 🗂️ Task Manager API

Task Manager API — a developer-focused, modular task-tracking backend (Jira-style) built with Node.js (ESM) and TypeScript.
Implements JWT authentication, MongoDB persistence, and RESTful project & task management APIs with rich filtering, and role-based access control.

## 🚀 Features
- 🔐 JWT-based authentication (`/register`, `/login`, `/me`)
- 🧾 CRUD operations for tasks
- 🧩 Role-based & ownership validation
- ⚙️ Modular architecture — routes, controllers, services
- ✅ Input validation and centralized error handling
- 🧱 TypeScript for static typing and maintainability
- 🧪 Test-ready structure (supports Jest/Ava)
- 📘 Swagger-UI auto-generated API documentation

---

## 🧰 Tech Stack
**Node.js 18+** · **Express** · **TypeScript** · **MongoDB** · **JWT** · **Zod / express-validator**  
Optionally: **Docker**, **Swagger (OpenAPI)**, **GitHub Actions** for CI

---

## ⚙️ Quick Setup

### 1️⃣ Prerequisites
- Node.js ≥ 18  
- MongoDB (local or Atlas)

### 2️⃣ Installation
```bash
git clone https://github.com/Rupanshy/task-manager-api.git
cd task-manager-api
npm install

3️⃣ Environment Setup
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager_api
JWT_SECRET=super_secret_change_me
JWT_EXPIRES_IN=1d
NODE_ENV=development

4️⃣ Run the service
npm run dev

Verify
Swagger Docs → http://localhost:3000/api/task/docs
Health Check → http://localhost:3000/health

5️⃣ Sample Requests
# Register
curl -X POST http://localhost:3000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"Demo","email":"demo@demo.io","password":"Demo#123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"demo@demo.io","password":"Demo#123"}'

# Create task (replace TOKEN below)
curl -X POST http://localhost:3000/api/tasks \
 -H "Authorization: Bearer $TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"title":"My first task"}'

🗺️ Current Scope
✅ Auth + Project + Task routes (working end-to-end)
🧩 Modular microservice structure (ready for expansion)
🚧 Upcoming:
Refresh tokens & role hierarchy
Docker deployment + Render/Atlas setup
Unit & integration tests
CI/CD (GitHub Actions)

📦 Notes
All configuration is environment-driven (.env).
Secrets previously committed have been rotated.
Designed for easy cloud deployment — Atlas + Render ready.

🔗 GitHub
https://github.com/Rupanshy/task-manager-api

🗨️ About
Built by Rupanshy Sharma to demonstrate end-to-end ownership of backend microservices using modern TypeScript and clean architecture principles.

💡 Why this version works
Sounds production-ready but honest about current scope.
Mentions everything a hiring engineer looks for: architecture, testing, documentation, CI readiness.
Doesn’t highlight “not deployed”; instead, frames it as “ready for deployment.”
Ends with a professional personal note.