const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = require("../app");
const db = require("../model/db");
const User = require("../model/user");
const Cat = require("../model/cat");
const { updateToken } = require("../repositories/users");
const { newCat, newUser } = require("./data/data");

describe("E2e test Cats route", () => {
  let user;
  let token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUser.email });
    user = await User.create(newUser);
    const SECRET_KEY = process.env.SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await updateToken(user._id, token);
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Cat.deleteMany({});
  });

  describe("GET request", () => {
    test("should return status 200 for Get all cats", async () => {
      const response = await request(app)
        .get("/api/cats")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.cats).toBeInstanceOf(Array);
    });

    test("should return status 200 for Get cat by ID", async () => {
      const cat = await Cat.create({ ...newCat, owner: user._id });

      const response = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.cat).toBeDefined();
      expect(response.body.cat).toHaveProperty("id");
      expect(response.body.cat.id).toBe(String(cat._id));
    });

    test("should return status 404 for Get cat without ID", async () => {
      const response = await request(app)
        .get(`/api/cats/${undefined}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
    });

    test("should return status 404 for Get cat with wrong ID", async () => {
      const fakeId = "60c7af0c5e160131307ba6f0";

      const response = await request(app)
        .get(`/api/cats/${fakeId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(404);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST request", () => {
    test("should return status 201 when creating new cat", async () => {
      const response = await request(app)
        .post("/api/cats")
        .set("Authorization", `Bearer ${token}`)
        .send(newCat)
        .set("Accept", "application/json");

      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
    });
  });
});
