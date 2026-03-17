const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const Book = require("./models/Book");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server working");
});

app.get("/", (req, res) => {
  res.send("Library API Running");
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.use("/api", bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
