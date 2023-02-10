import { Contact } from "../../entities/contact.entity";
import { IContact } from "../../interfaces/contact";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";

const ContactCreateService = async (
  { name, email, phone }: IContact,
  clientId: string
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: clientId });

  const contact = contactRepository.create({
    name,
    email,
    phone,
    client: client!,
  });

  await contactRepository.save(contact);

  return contact;
};

export default ContactCreateService;
