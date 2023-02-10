import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import AppError from "../../errors/appError";

const clientOneListService = async (id: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id });

  if (!client) throw new AppError("client not found", 404);

  return client;
};

export default clientOneListService;
