import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";

describe("/clients", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source inicialization", err);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });
  jest.setTimeout(50000);
  test("POST /clients-  Must be able to create a clients", async () => {
    const response = await request(app).post("/clients").send({
      email: "test@gmail.com",
      phone: "99888889999",
      name: "test",
      password: "123",
    });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).not.toHaveProperty("password");

    expect(response.body.name).toEqual("test");
    expect(response.body.email).toEqual("test@gmail.com");

    expect(response.status).toBe(201);
  });

  test("POST /clients - Should not be able to create a client email that already exists ", async () => {
    const response = await request(app).post("/clients").send({
      email: "test@gmail.com",
      phone: "99888881111",
      name: "test",
      password: "123",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
