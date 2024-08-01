const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/borrow", bookController.borrowBook);
router.post("/return", bookController.returnBook);
router.get("/books", bookController.getBooks);
module.exports = router;
