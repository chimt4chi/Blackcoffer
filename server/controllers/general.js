import Book from "../models/Book.js";

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
