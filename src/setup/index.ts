// src/test/setup.ts
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

// Increase timeout for setup
jest.setTimeout(30000);

// Function to ensure connection is closed
const closeConnection = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
};

beforeAll(async () => {
  // Close any existing connection
  await closeConnection();

  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Memory Server");
  } catch (error) {
    console.error("MongoDB setup failed:", error);
    throw error;
  }
});

afterAll(async () => {
  await closeConnection();
  console.log("Disconnected from MongoDB Memory Server");
});

beforeEach(async () => {
  // Clear all collections
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});
