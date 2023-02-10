import { compareSync, hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { Contact } from "../../entities/contact.entity";
import { IContact } from "../../interfaces/contact";

const contactUpdateService = async (
  { name, email, phone }: IContact,
  id: string
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.find();

  const contactEmail = findContact.find((contact) => contact?.email === email);

  const contactPhone = findContact.find((contact) => contact?.phone === phone);

  if (contactEmail) throw new AppError("This email has already been used", 400);

  if (contactPhone) throw new AppError("This phone has already been used", 400);

  const contact = findContact.find((contact) => contact.id === id);
  if (!contact) throw new AppError("contact not found", 404);

  console.log(contact);
  await contactRepository.update(id, {
    name,
    email,
    phone,
  });

  const contactUpdate = await contactRepository.findOneBy({ id });

  return contactUpdate!;
};

export default contactUpdateService;
