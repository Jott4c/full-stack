import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import AppError from "../../errors/appError";

const contactDeleteService = async (id: string): Promise<boolean> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  let contact = await contactRepository.findOneBy({ id });

  if (!contact) throw new AppError("contact not found", 404);

  await contactRepository.delete({ id });

  return true;
};

export default contactDeleteService;
