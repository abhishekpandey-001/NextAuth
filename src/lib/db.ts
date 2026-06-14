const mongodbUrl = process.env.MONGO_URI;
if (!mongodbUrl) {
  throw new Error("MongoDb URL is not found");
}
