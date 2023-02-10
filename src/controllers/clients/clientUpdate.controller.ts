import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/appError";
import clientUpdateService from "../../services/clients/clientUpdate.service";

const clientUpdateController = async (req: Request, res: Response) => {
  const client = req.body;

  const id: string = req.params.id;

  if (id !== req.user?.id) throw new AppError("account owner required", 403);

  const updatedUser = await clientUpdateService(client, id);

  return res.status(200).json(instanceToPlain(updatedUser));
};

export default clientUpdateController;
