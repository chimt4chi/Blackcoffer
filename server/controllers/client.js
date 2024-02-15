import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    const booksWithStats = await Promise.all(
      books.map(async (book) => {
        const stat = await Book.countDocuments({
          bookId: book._id,
        });
        return {
          ...book._doc,
          stat,
        };
      })
    );

    res.status(200).json(booksWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const books = Book.find();

    const mappedLocations = books.reduce();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
