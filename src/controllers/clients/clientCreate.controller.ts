import { instanceToPlain } from "class-transformer";
import { Response, Request } from "express";
import clientCreateService from "../../services/clients/clientCreate.service";

const clientCreateController = async (req: Request, res: Response) => {
  try {
    const client = req.body;

    const newclient = await clientCreateService(client);

    return res.status(201).json(instanceToPlain(newclient));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export default clientCreateController;
