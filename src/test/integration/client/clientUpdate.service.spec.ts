import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import { DataSource } from "typeorm";
import { Client } from "../../../entities/client.entity";
import bcrypt from "bcrypt";

describe("/clients", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source inicialization", err);
      });
    const hash = await bcrypt.hash("123", 10);
    const client = await connection
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values([
        {
          id: "6a994ec7-f888-448e-85ad-54f3035bd569",
          name: "test",
          email: "test@gmail.com",
          phone: "998888899999",
          password: hash,
        },
      ])
      .execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  jest.setTimeout(50000);
  test("PATCH /clients/:id -  should not be able to update clients without authentication", async () => {
    const loginResponse = await request(app).post("/session").send({
      email: "test@gmail.com",
      password: "123",
    });

    const newValues = { name: "test2", email: "test2@gmail.com" };

    const response = await request(app)
      .patch(`/clients/6a994ec7-f888-448e-85ad-54f3035bd569`)
      .set("Authorization", loginResponse.body.token)
      .send(newValues);

    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.email).toEqual("test2@gmail.com");
    expect(response.body.name).toEqual("test2");
  });
});
