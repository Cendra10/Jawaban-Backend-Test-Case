const bookService = require("../services/bookService");

exports.borrowBook = async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    const message = await bookService.borrowBook(memberCode, bookCode);
    res.json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    const message = await bookService.returnBook(memberCode, bookCode);
    res.json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
