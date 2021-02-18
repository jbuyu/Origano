import mongoose from "mongoose";
import consola from "consola";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    consola.success(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    consola.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
