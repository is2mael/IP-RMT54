const request = require("supertest");
const app = require("../app");
const { Favorite } = require("../models");

describe("Favorite Endpoints", () => {
  let validToken; // Token untuk otentikasi
  let favId;

  beforeAll(async () => {
    // Simpan token otentikasi setelah login untuk pengujian lebih lanjut
    const loginResponse = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    validToken = loginResponse.body.access_token;
  });

  // Pengujian menambahkan favorite baru
  describe("POST /favorites/:id", () => {
    it("should add a new favorite", async () => {
      const res = await request(app)
        .post("/favorites/1")
        .send({ id: 1, webformatURL: "http://example.com/image.jpg", views: 100, likes: 10 })
        .set("Authorization", `Bearer ${validToken}`);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
      favId = res.body.data.id;
    });
  });

  // Pengujian mendapatkan semua favorite user
  describe("GET /favorites", () => {
    it("should get all user favorites", async () => {
      const res = await request(app).get("/favorites").set("Authorization", `Bearer ${validToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    });
  });

  // Pengujian menghapus favorite berdasarkan ID
  describe("DELETE /favorites/:id", () => {
    it("should delete a favorite by ID", async () => {
      const res = await request(app).delete(`/favorites/${favId}`).set("Authorization", `Bearer ${validToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Favorite deleted successfully");
    });
  });
});
