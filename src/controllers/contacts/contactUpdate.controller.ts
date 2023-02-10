import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import contactUpdateService from "../../services/contacts/contactUpdate.service";

const contactUpdateController = async (req: Request, res: Response) => {
  const contact = req.body;
  const id: string = req.params.id;

  const updatedUser = await contactUpdateService(contact, id);

  return res.status(200).json(instanceToPlain(updatedUser));
};

export default contactUpdateController;
