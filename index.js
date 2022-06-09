//import dotenv from "dotenv";
//dotenv.config();

import express from "express";
import db from "./config/database.js";
import abilityRoutes from "./routes/ability.js";
import characterRoutes from "./routes/character.js";
import featRoutes from "./routes/feat.js";
import gameDataRoutes from "./routes/gameData.js";
import itemRoutes from "./routes/item.js";

import cors from "cors";

const app = express();

app.get("/", (req, res, next) => {
  try {
    throw new Error("Something went wrong!");
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Something went wrong!",
      },
    });
  }
});

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(cors());

app.use(express.json());

app.use("/ability", abilityRoutes);
app.use("/character", characterRoutes);
app.use("/feat", featRoutes);
app.use("/item", itemRoutes);

app.use("/gameData", gameDataRoutes);

app.listen(5000, () => console.log("Server running on PORT:", 5000));
/*
app.listen(process.env.APP_PORT, () =>
  console.log("Server running on PORT:", process.env.APP_PORT)
);
*/
