// src/task-service/server.ts
import express from "express";
import morgan from "morgan";
import { connectTaskDb } from "./db/mongoose.js";
import { PORT } from "../common/config/env.js"; // or "../common/config/env.js"
import { mountSwagger } from "./swagger.js";
import projectRouter from "./routes/projectRoute.js";
import { taskRouter } from "./routes/taskRouter.js";
import { requireAuth } from "./middleware/auth.js"
import { JWT_SECRET } from "../common/config/env.js";

console.log("Task Service Jwt ", JWT_SECRET);

const app = express();
app.use(express.json());
app.use(morgan("dev"));

await connectTaskDb();

// --- API: swagger + ping under /api/task
const api = express.Router();
api.get("/ping", (_req, res) => res.json({ ok: true }));
mountSwagger(api);                 // -> /api/task/docs
app.use("/api/task", api);

app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

// --- Health
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// --- Start
const port = Number(PORT) || 3000;

app.get('/api/whoami', requireAuth, (req, res) => {
  res.json({ ok: true, user: (req as any).user });
});

app.listen(port, () => console.log(`[LISTENING] http://localhost:${port}`));
