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

app.set("json spaces", 2);

app.get("/books", (req, res) => {
  const books = [
    {
      _id: "1",
      title: "The Alchemist",
      isbn: "9780061122415",
      author: "Paulo Coelho",
      totalCopies: 10,
      genre: "Fiction",
      publisher: "HarperCollins",
      status: "Available"
    },
    {
      _id: "2",
      title: "Rich Dad Poor Dad",
      isbn: "9781612680194",
      author: "Robert Kiyosaki",
      totalCopies: 5,
      genre: "Finance",
      publisher: "Plata Publishing",
      status: "Available"
    },
    {
      _id: "3",
      title: "Atomic Habits",
      isbn: "9780735211292",
      author: "James Clear",
      totalCopies: 7,
      genre: "Self-help",
      publisher: "Avery",
      status: "Available"
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
