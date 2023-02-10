import { Router } from "express";
import sessionController from "../controllers/sessions/session.controller";

const routes = Router();

routes.post("", sessionController);

export default routes;
