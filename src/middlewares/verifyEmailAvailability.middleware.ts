import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Client } from "../entities/client.entity";

const verifyEmailAvailabilityMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(Client)
    const users = await userRepository.find()
    const { email } = req.body;

  const userArealdyExists = users.find((user) => user.email === email);

  if (userArealdyExists) {
    return res.status(400).json({ message: "This email has already been used" });
  }

  next();
};

export default verifyEmailAvailabilityMiddleWare;