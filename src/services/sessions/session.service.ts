import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientSession } from "../../interfaces/clients";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../../errors/appError";

const sessionService = async ({
  email,
  password,
}: IClientSession): Promise<Object> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ email: email });

  if (!client) throw new AppError("Wrong email or password", 403);

  if (!bcrypt.compareSync(password, client.password))
    throw new AppError("Wrong email or password", 403);

  const token = jwt.sign(
    { email: client.email },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1d",
      subject: client.id,
    }
  );

  return {
    token: token,
  };
};

export default sessionService;
