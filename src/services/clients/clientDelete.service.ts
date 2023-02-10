import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import AppError from "../../errors/appError";

const clientDeleteService = async (id: string): Promise<boolean> => {
  const clientRepository = AppDataSource.getRepository(Client);

  let client = await clientRepository.findOneBy({ id });

  if (!client) throw new AppError("client not found", 404);

  await clientRepository.delete({ id });

  return true;
};

export default clientDeleteService;
