import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Contact } from "../entities/contact.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Client {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contact, (contact) => contact.client, {
    eager: true,
  })
  contact: Contact[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
