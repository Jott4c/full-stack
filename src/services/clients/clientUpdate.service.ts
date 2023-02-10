import { compareSync, hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import AppError from "../../errors/appError";
import { IClientUpdate } from "../../interfaces/clients";

const clientUpdateService = async (
  { name, email, phone, password, oldPassword }: IClientUpdate,
  id: string
): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const userEmail = (await clientRepository.find()).find(
    (client) => client?.email === email
  );

  if (userEmail) throw new AppError("This email has already been used", 400);

  const findClient = (await clientRepository.find()).find(
    (client) => client.id === id
  );
  if (!findClient) throw new AppError("client not found", 404);

  if (password) {
    if (!oldPassword)
      throw new AppError(
        "to change the password you need to send the 'oldPassword'",
        400
      );
    const equalsPassword = compareSync(oldPassword, findClient.password);

    if (!equalsPassword) throw new AppError("incorrect password", 403);
    password = hashSync(password, 10);
  }

  await clientRepository.update(id, {
    name,
    email,
    phone,
    password,
  });

  const user = await clientRepository.findOneBy({ id });

  return user!;
};

export default clientUpdateService;
