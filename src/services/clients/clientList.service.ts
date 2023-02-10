import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClient } from "../../interfaces/clients";

const clientListService = async (): Promise<IClient[]> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const clients = await clientRepository.find();

  return clients;
};

export default clientListService;
