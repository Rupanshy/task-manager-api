
import { Router } from "express";
import { mountSwagger } from "../swagger.js";

const apiRouter = Router();
apiRouter.get("/ping", (_req, res) => res.json({ ok: true })); // simple check
mountSwagger(apiRouter); // -> /api/task/docs

export default apiRouter;


