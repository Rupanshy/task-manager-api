import path from "path";
import { fileURLToPath } from "url";
import { Router } from "express";
import yaml from "yaml";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function mountSwagger(router: Router) {
  const specPath = path.join(__dirname, "openapi.yaml");
  const file = fs.readFileSync(specPath, "utf8");
  const swaggerDocument = yaml.parse(file);

  router.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Task Service API Docs",
    })
  );
}
