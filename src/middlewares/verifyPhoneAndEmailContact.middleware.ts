import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entity";

const verifyPhoneAndEmailAvailabilityMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Contact);
  const users = await userRepository.find();

  const { email, phone } = req.body;

  const emailArealdyExists = users.find((user) => user.email === email);

  const phoneArealdyExists = users.find((user) => user.phone === phone);

  if (emailArealdyExists) {
    return res
      .status(400)
      .json({ message: "This email has already been used" });
  }

  if (phoneArealdyExists) {
    return res
      .status(400)
      .json({ message: "This phone has already been used" });
  }

  next();
};

export default verifyPhoneAndEmailAvailabilityMiddleWare;
