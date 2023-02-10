import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IContact } from "../../interfaces/contact";
import contactOneListService from "../../services/contacts/contactOneList.service";

const contactOneListController = async (req: Request, resp: Response) => {
  const id = req.params.id;

  const contact: IContact = await contactOneListService(id);

  return resp.status(200).json(
    instanceToPlain(
      instanceToPlain({
        contact: contact,
      })
    )
  );
};

export default contactOneListController;
