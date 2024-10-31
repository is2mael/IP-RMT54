const request = require("supertest");
const app = require("../app"); // Import aplikasi Express utama Anda
const { User } = require("../models");

describe("User Endpoints", () => {
  // Bersihkan database sebelum dan sesudah pengujian
  beforeAll(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  // Pengujian register user
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("username", "testuser");
    });
  });

  // Pengujian login user
  describe("POST /login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/login").send({
        email: "testuser@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("access_token");
    });

    it("should fail with wrong credentials", async () => {
      const res = await request(app).post("/login").send({
        email: "testuser@example.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toEqual(401);
    });
  });

  // Pengujian untuk mendapatkan semua user
  describe("GET /user", () => {
    it("should get all users", async () => {
      const res = await request(app).get("/user").set("Authorization", `Bearer ${validToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
    });
  });

  // Pengujian untuk mendapatkan user berdasarkan ID
  describe("GET /user/:id", () => {
    it("should get a user by ID", async () => {
      const res = await request(app).get(`/user/${userId}`).set("Authorization", `Bearer ${validToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
    });
  });
});
