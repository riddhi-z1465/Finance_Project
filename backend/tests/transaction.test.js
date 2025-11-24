import request from 'supertest';
import app from '../app.js'
import mongoose from 'mongoose';
import 'dotenv/config.js';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Transaction Routes", () => {
    it("should get all transactions (unprotected)", async () => {
        const res = await request(app).get("/api/transactions");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should create a transaction (unprotected)", async () => {
        const res = await request(app)
            .post("/api/transactions")
            .send({ amount: 99.99, currency: "USD", description: "Payment", type: "debit" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.amount).toBe(99.99);
    });
});
