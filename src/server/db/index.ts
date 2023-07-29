import mongoose, { ConnectOptions } from "mongoose";

const url =
  "mongodb+srv://laytoder:lay1outube@cluster0.smwb9zq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, { useNewUrlParser: true } as ConnectOptions)
  .catch((err: any) => {
    throw err;
  });

export default mongoose.connection;
