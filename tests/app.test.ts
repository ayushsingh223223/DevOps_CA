import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app";

const app = createApp();

describe("REST API", () => {
  it("returns API metadata", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("node-rest-api-cicd");
    expect(response.body.documentation).toBe("/health");
  });

  it("returns a healthy response", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("node-rest-api-cicd");
    expect(response.body.timestamp).toBeTypeOf("string");
  });

  it("returns a not found error for unknown routes", async () => {
    const response = await request(app).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Route not found");
  });
});
