import { Router } from "express";
import clientCreateController from "../controllers/clients/clientCreate.controller";
import clientDeleteController from "../controllers/clients/clientDelete.controller";
import clientListController from "../controllers/clients/clientList.controller";
import clientOneListController from "../controllers/clients/clientOneList.controller";
import clientUpdateController from "../controllers/clients/clientUpdate.controller";
import ensureAuthMiddleware from "../middlewares/authToken";
import verifyEmailAvailabilityMiddleWare from "../middlewares/verifyEmailAvailability.middleware";

const routes = Router();

routes.get("", ensureAuthMiddleware, clientListController);
routes.get("/:id", ensureAuthMiddleware, clientOneListController);
routes.post("", verifyEmailAvailabilityMiddleWare, clientCreateController);
routes.patch("/:id", ensureAuthMiddleware, clientUpdateController);
routes.delete("/:id", ensureAuthMiddleware, clientDeleteController);

export default routes;
