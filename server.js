import express from "express";
import dotenv from "dotenv";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

dotenv.config(); // Load environment variables from .env file

import todoRouter from "./routes/todo.js";
import connectdb from "./db/connectdb.js";

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Use the todo router for the "/api/v1/todo" path
app.use("/api/v1/todo", todoRouter);

// only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const port = process.env.PORT || 5000; // Use PORT (uppercase)

const start = async () => {
  try {
    // Connect to the database
    await connectdb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (error) {
    console.log("Failed to start server:", error);
  }
};

start();
