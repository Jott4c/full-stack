import { Response, Request } from "express";
import { instanceToPlain } from "class-transformer";
import contactCreateService from "../../services/contacts/contactCreate.service";

const contactCreateController = async (req: Request, res: Response) => {
  try {
    const contact = req.body;
    const clientId = req.user.id;

    const newContact = await contactCreateService(contact, clientId);

    return res.status(201).json(instanceToPlain(newContact));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export default contactCreateController;
