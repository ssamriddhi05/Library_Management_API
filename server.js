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

app.get("/books", (req, res) => {
  const books = [
    {
      _id: "1",
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299
    },
    {
      _id: "2",
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 350
    },
    {
      _id: "3",
      title: "Atomic Habits",
      author: "James Clear",
      price: 450
    }
  ];

  res.json(books);
});

app.use("/api", bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
