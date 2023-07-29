import express, { Application } from "express";
import connection from "./db";

export default function createServer() {
  const app: Application = express();
  const PORT = 8000;

  app.use(express.json());
  // app.use(routes);

  connection.once("open", () => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  });
}
