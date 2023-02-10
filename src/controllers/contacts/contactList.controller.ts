import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import contactListService from "../../services/contacts/contactList.service";

const contactListController = async (req: Request, res: Response) => {
  try {
    const clientId = req.user.id;
    const contacts = await contactListService(clientId);

    return res.status(200).json(instanceToPlain(contacts));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

export default contactListController;
