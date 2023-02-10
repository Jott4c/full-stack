import { Router } from "express";

import contactCreateController from "../controllers/contacts/contactCreate.controller";
import contactDeleteController from "../controllers/contacts/contactDelete.controller";
import contactListController from "../controllers/contacts/contactList.controller";
import contactOneListController from "../controllers/contacts/contactOneList.controller";
import contactUpdateController from "../controllers/contacts/contactUpdate.controller";
import ensureAuthMiddleware from "../middlewares/authToken";
import verifyPhoneAndEmailAvailabilityMiddleWare from "../middlewares/verifyPhoneAndEmailContact.middleware";

const routes = Router();

routes.get("", ensureAuthMiddleware, contactListController);
routes.get("/:id", ensureAuthMiddleware, contactOneListController);
routes.post(
  "",
  ensureAuthMiddleware,
  verifyPhoneAndEmailAvailabilityMiddleWare,
  contactCreateController
);
routes.patch("/:id", ensureAuthMiddleware, contactUpdateController);
routes.delete("/:id", ensureAuthMiddleware, contactDeleteController);

export default routes;
