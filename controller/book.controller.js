const CustomErrorHandler = require("../error/custom-error-handler");
const { search } = require("../router/author.routes");
const Book = require("../schema/book.schema");

// ✅ Get all books + populate
const getAllBooks = async (req,res,next) => {
  try {
    const books = await Book.find().populate("author_info");
    res.status(200).json(books);
  } catch (error) {
    next(error)
  }
};

// ✅ Add new book
const addBook = async (req,res,next) => {
  try {
    const {
      title, period, img, genre, page,
      publishedYear, publishedHome, desc, author_info
    } = req.body;

    await Book.create({
      title, period, img, genre, page,
      publishedYear, publishedHome, desc, author_info
    });

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    next(error)
  }
};

const getOneBook = async (req,res,next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("author_info");
    if (!book) {
     throw CustomErrorHandler.NotFound("Book not found")
    }
    res.status(200).json(book);
  } catch (error) {
    next(error)
  }
};

const updateBook = async (req,res,next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Book.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
   throw CustomErrorHandler.NotFound("Book not found")
    }
    res.status(200).json({ message: "Book updated", updated });
  } catch (error) {
    next(error)
  }
};

const deleteBook = async (req,res,next) => {
  try {
    const { id } = req.params;
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) {
throw CustomErrorHandler.NotFound("Book not found")
    }
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getOneBook,
  updateBook,
  search,
  deleteBook,
};
