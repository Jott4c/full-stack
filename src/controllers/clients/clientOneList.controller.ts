import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/appError";
import { IClient } from "../../interfaces/clients";
import clientOneListService from "../../services/clients/clientOneList.service";

const clientOneListController = async (req: Request, resp: Response) => {
  if (req.params.id !== req.user?.id)
    throw new AppError("account owner required", 403);

  const client: IClient = await clientOneListService(req.params.id);

  return resp.status(200).json(
    instanceToPlain(
      instanceToPlain({
        client: client,
      })
    )
  );
};

export default clientOneListController;
