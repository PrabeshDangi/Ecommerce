const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");

app.on("error", (e) => {
  console.error("Error:", e);
  throw error;
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log("Database connection error.");
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Hello from server!!",
  });
});

try {
  app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
  });
} catch (error) {
  console.log("Error connecting to the server!!");
}
