const express = require("express");
const router = express.Router();
const reverseAlphabet = require("../algorithms/reverseAlphabet");
const longestWord = require("../algorithms/longestWord");
const countWords = require("../algorithms/countWords");
const diagonalDifference = require("../algorithms/diagonalDifference");

/**
 * @swagger
 * /reverse-alphabet:
 *   get:
 *     summary: "Reverse the alphabet string"
 *     description: "Reverses the alphabet string while keeping numbers at the end."
 *     parameters:
 *       - in: query
 *         name: input
 *         required: true
 *         description: "The string to reverse"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Reversed alphabet string"
 */
router.get("/reverse-alphabet", (req, res) => {
  const { input } = req.query;
  res.json({ result: reverseAlphabet(input) });
});

/**
 * @swagger
 * /longest-word:
 *   get:
 *     summary: "Find the longest word"
 *     description: "Finds the longest word in a given sentence."
 *     parameters:
 *       - in: query
 *         name: sentence
 *         required: true
 *         description: "The sentence to analyze"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Longest word in the sentence"
 */
router.get("/longest-word", (req, res) => {
  const { sentence } = req.query;
  res.json({ result: longestWord(sentence) });
});

/**
 * @swagger
 * /count-words:
 *   get:
 *     summary: "Count word occurrences"
 *     description: "Counts the occurrences of words in an input array."
 *     parameters:
 *       - in: query
 *         name: input
 *         required: true
 *         description: "The array of input words"
 *         schema:
 *           type: string
 *       - in: query
 *         name: query
 *         required: true
 *         description: "The array of query words to count"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Count of each query word in the input"
 */
router.get("/count-words", (req, res) => {
  try {
    const input = JSON.parse(req.query.input);
    const query = JSON.parse(req.query.query);

    if (!Array.isArray(input) || !Array.isArray(query)) {
      return res.status(400).json({ error: "Input and query must be arrays" });
    }
    res.json({ result: countWords(input, query) });
  } catch (error) {
    res.status(400).json({ error: "Invalid input or query format" });
  }
});

/**
 * @swagger
 * /diagonal-difference:
 *   get:
 *     summary: "Calculate diagonal difference"
 *     description: "Calculates the difference between the sums of the diagonals in a matrix."
 *     parameters:
 *       - in: query
 *         name: matrix
 *         required: true
 *         description: "The matrix to analyze, should be a string of nested arrays"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Difference between diagonal sums"
 */
router.get("/diagonal-difference", (req, res) => {
  try {
    const { matrix } = req.query;
    res.json({ result: diagonalDifference(JSON.parse(matrix)) });
  } catch (error) {
    res.status(400).json({ error: "Invalid matrix format" });
  }
});

module.exports = router;
