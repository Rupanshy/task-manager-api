// src/auth-service/server.ts
import express from "express";
import morgan from "morgan";
import { connectAuthDb } from "./db/mongoose.js";      // auth DB connector
import { AUTHPORT } from "../common/config/env.js";            // shared config (.env)
import { authRouter } from "./routes/authRoute.js";   // your existing auth routes
import { JWT_SECRET } from "../common/config/env.js";

console.log("Auth Service Jwt ", JWT_SECRET); 

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// mount routes under /api/auth
app.use("/api/auth", authRouter);

// simple health endpoint
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const port = Number(AUTHPORT) || 3001;

(async () => {
  try {
    await connectAuthDb();
    console.log("[auth-service] MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }

  const server = app.listen(port, "127.0.0.1", () => {
    const addr = server.address();
    console.log("[boot] listen address:", addr);
    console.log(`[auth-service] Server up on http://localhost:${port}`);
  });
})();
