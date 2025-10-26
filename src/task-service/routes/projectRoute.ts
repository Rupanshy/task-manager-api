
import { Router } from "express";
import { requireAuth } from "../../auth-service/controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { projectSchemas } from "../validator-schema/projectValidator.js";
import * as controller from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.use(requireAuth);

projectRouter
  .route("/")
  .get(validate(projectSchemas.query, "query"), controller.listProjects)
  .post(validate(projectSchemas.create, "body"), controller.createProject);

  /*
projectRouter
  .route("/:projectId")
  .get(controller.getProject)
  .patch(validate(projectSchemas.update, "body"), controller.updateProject)
  .delete(controller.deleteProject);
*/
export default projectRouter;

