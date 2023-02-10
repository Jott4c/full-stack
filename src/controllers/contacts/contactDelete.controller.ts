import { Request, Response } from "express";
import AppError from "../../errors/appError";
import contactDeleteService from "../../services/contacts/contactDelete.service";

const contactDeleteController = async (req: Request, res: Response) => {
  const id = req.params.id;

  await contactDeleteService(id);

  return res.status(204).send();
};
export default contactDeleteController;
