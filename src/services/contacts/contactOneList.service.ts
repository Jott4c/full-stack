import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import AppError from "../../errors/appError";

const contactOneListService = async (id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id });

  if (!contact) throw new AppError("contact not found", 404);

  return contact;
};

export default contactOneListService;
