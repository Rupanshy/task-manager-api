import path from "path";
import { fileURLToPath } from "url";
import { Router } from "express";
import yaml from "yaml";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function mountSwagger(router: Router) {
  try {
    const specPath = path.join(__dirname, "openapi.yaml");
    console.log("[swagger] loading:", specPath);
    const spec = yaml.parse(fs.readFileSync(specPath, "utf8"));
    router.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
  } catch (e) {
    console.error("[swagger] failed:", e);
    router.get("/docs", (_req, res) => res.status(500).json({ error: "SWAGGER_LOAD_FAILED" }));
  }
}
