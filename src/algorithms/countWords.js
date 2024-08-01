/**
 * Counts the occurrences of words in an input array based on a query array.
 * @param {array} input
 * @param {array} query
 * @returns {array}
 */
function countWords(input, query) {
  if (!Array.isArray(input) || !Array.isArray(query)) {
    throw new Error("Input and query must be arrays");
  }
  const counts = query.map((word) => input.filter((item) => item === word).length);
  return counts;
}

module.exports = countWords;
