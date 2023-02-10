import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./client.entity";

@Entity()
export class Contact {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @ManyToOne(() => Client)
  @Exclude()
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
