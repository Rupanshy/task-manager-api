# 🗂️ Task Manager API

Task Manager API — A developer-focused task tracking backend (Jira-style) built with Node.js (ESM) + TypeScript, JWT Auth + RBAC, MongoDB, server-enforced status workflows, rich filtering & pagination, Swagger docs, tests, and CI.

## 🚀 Features
- 🔐 JWT-based authentication (`/register`, `/login`, `/me`)
- 🧾 CRUD operations for tasks
- 🧩 Role-based & ownership validation
- ⚙️ Modular architecture — routes, controllers, services
- ✅ Input validation and centralized error handling
- 🧱 TypeScript for static typing and maintainability
- 🧪 Test-ready structure (supports Jest/Ava)

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

Roadmap
✅ Core Auth + Task microservice
🔄 Refresh tokens
🧩 Role-based hierarchy (admin, user)
📘 Swagger documentation
🧪 Unit + integration tests
🐳 Docker deployment
⚡ CI/CD integration (GitHub Actions)

💡 Note: Secrets are managed via environment variables. All previously committed sensitive data has been rotated.