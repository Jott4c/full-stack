import { Request, Response } from "express";
import clientListService from "../../services/clients/clientList.service";
import { instanceToPlain } from "class-transformer";

const clientListController = async (req: Request, res: Response) => {
  try {
    const clients = await clientListService();

    return res.status(200).json(instanceToPlain(clients));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

export default clientListController;
