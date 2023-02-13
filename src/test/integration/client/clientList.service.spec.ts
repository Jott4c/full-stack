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
    await connection
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values([
        {
          id: "6a994ec7-f888-448e-85ad-54f3035ba422",
          name: "test",
          email: "test@gmail.com",
          phone: "99888889999",
          password: hash,
        },
      ])
      .execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  jest.setTimeout(50000);
  test("GET /clients -  Must be able to list clients", async () => {
    await request(app).post("/clients").send();
    const loginResponse = await request(app).post("/session").send({
      email: "test@gmail.com",
      password: "123",
    });

    const token = `Bearer ${loginResponse.body.token}`;

    const response = await request(app)
      .get("/clients")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/clients");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
