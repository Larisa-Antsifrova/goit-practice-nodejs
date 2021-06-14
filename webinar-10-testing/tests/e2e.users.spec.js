const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const app = require("../app");
const db = require("../model/db");
const User = require("../model/user");
const { updateToken } = require("../repositories/users");
const { newTestUser } = require("./data/data");
require("dotenv").config();

jest.mock("cloudinary");

describe("E2e test Users route", () => {
  let token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newTestUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newTestUser.email });
    await mongo.disconnect();
  });

  test("Register user: success", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(newTestUser)
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
  });

  test("Register user: conflict", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(newTestUser)
      .set("Accept", "application/json");

    expect(response.status).toEqual(409);
    expect(response.body).toBeDefined();
  });

  test("Login user: success", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(newTestUser)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    token = response.body.data.token;
  });

  test("Login user: wrong info", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({})
      .set("Accept", "application/json");

    expect(response.status).toEqual(401);
  });

  test("Upload user avatar", async () => {
    const buf = await fs.readFile("./tests/data/myAvatar.png");
    const response = await request(app)
      .patch("/api/users/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buf, "myAvatar.png");

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.data.avatarUrl).toEqual("secure-url");
  });

  test("Logout user", async () => {
    const response = await request(app)
      .post("/api/users/logout")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .set("Accept", "application/json");

    expect(response.status).toEqual(204);
  });
});
