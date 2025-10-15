import express from "express";
import morgan from "morgan";
import { authRouter } from "./auth-service/routes/authRoute.js"; 

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

export default app;
