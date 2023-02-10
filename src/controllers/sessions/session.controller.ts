import { Request, Response } from "express";
import sessionService from "../../services/sessions/session.service";

const sessionController = async (req: Request, res: Response) => {
  const user = req.body;

  const token = await sessionService(user);

  return res.status(200).json(token);
};

export default sessionController;
