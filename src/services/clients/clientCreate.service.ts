import { Client } from "../../entities/client.entity";
import { IClient } from "../../interfaces/clients";
import AppDataSource from "../../data-source";
import { hashSync } from "bcrypt";

const ClientCreateService = async ({
  name,
  email,
  phone,
  password,
}: IClient): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  password = hashSync(password, 10);

  const client = clientRepository.create({
    name,
    email,
    phone,
    password,
  });

  await clientRepository.save(client);

  return client;
};

export default ClientCreateService;
