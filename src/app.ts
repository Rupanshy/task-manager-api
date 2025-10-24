import express from "express";
import morgan from "morgan";
import { authRouter } from "./auth-service/routes/authRoute.js";
import { apiRouter } from "./task-service/routes/apirRouter.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/task", apiRouter);

app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

export default app;
