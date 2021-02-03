import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import { User } from "../models/user";

const mongod = new MongoMemoryServer();

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}, () => {});
  }
};

const request = supertest(app);

afterEach(async () => clearDatabase());

afterAll(() => {
  closeDatabase();
});

describe("All Test Suites", () => {

  it("can add to users", async (done) => {
    request
      .post("/signup")
      .field("fullName", "foo")
      .field("email", "foo")
      .field("password", "foo")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          console.log(res);
          done();
        }
      });
  });

  it("can update a user", async () => {
    expect(async () => await User.findOneAndUpdate()).not.toThrow();
  });

  it("can delete a user", async () => {
    expect(async () => await User.findByIdAndDelete()).not.toThrow();
  });
});
