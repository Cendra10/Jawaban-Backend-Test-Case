/**
 * Finds the longest word in a given sentence.
 * @param {string} sentence
 * @returns {string}
 */
function longestWord(sentence) {
  const words = sentence.split(/\s+/);
  let longest = "";
  words.forEach((word) => {
    if (word.length > longest.length) {
      longest = word;
    }
  });
  return longest;
}

module.exports = longestWord;
