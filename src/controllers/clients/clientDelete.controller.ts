import { Request, Response } from "express";
import AppError from "../../errors/appError";
import clientDeleteService from "../../services/clients/clientDelete.service";

const clientDeleteController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id !== req.user?.id) throw new AppError("account owner required", 403);
  await clientDeleteService(id);

  return res.status(204).send();
};
export default clientDeleteController;
