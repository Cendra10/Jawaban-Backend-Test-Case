const Book = require("../models/bookModel");
const Member = require("../models/memberModel");
const moment = require("moment");

exports.getAllBooks = async () => {
  try {
    return await Book.find();
  } catch (error) {
    throw new Error("Error retrieving books");
  }
};

exports.borrowBook = async (memberCode, bookCode) => {
  const member = await Member.findOne({ code: memberCode });
  if (!member) {
    throw new Error("Member not found");
  }

  const borrowedBooksCount = await Book.countDocuments({ borrowedBy: memberCode });
  if (borrowedBooksCount >= 2) {
    throw new Error("Member cannot borrow more than 2 books");
  }

  const book = await Book.findOne({ code: bookCode });
  if (!book || book.stock <= 0) {
    throw new Error("Book not available");
  }

  if (book.borrowedBy) {
    throw new Error("Book is already borrowed");
  }

  book.borrowedBy = memberCode;
  book.borrowedDate = new Date();
  book.stock -= 1;
  await book.save();

  return "Book borrowed successfully";
};

exports.returnBook = async (memberCode, bookCode) => {
  const member = await Member.findOne({ code: memberCode });
  if (!member) {
    throw new Error("Member not found");
  }

  const book = await Book.findOne({ code: bookCode });
  if (!book || book.borrowedBy !== memberCode) {
    throw new Error("This book was not borrowed by this member");
  }

  const borrowedDate = moment(book.borrowedDate);
  const returnDate = moment();
  const daysLate = returnDate.diff(borrowedDate, "days");
  const penalty = daysLate > 7 ? daysLate - 7 : 0;

  book.borrowedBy = null;
  book.borrowedDate = null;
  book.stock += 1;
  await book.save();

  if (penalty) {
    member.penalty = true;
    await member.save();
    return `Book returned with penalty of ${penalty} day(s). Member cannot borrow books for 3 days.`;
  }

  return "Book returned successfully";
};
