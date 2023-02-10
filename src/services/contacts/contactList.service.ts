import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClient } from "../../interfaces/clients";

const contactListService = async (clientId: string): Promise<IClient> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const contacts = await clientRepository.findOneBy({ id: clientId });

  return contacts!;
};

export default contactListService;
