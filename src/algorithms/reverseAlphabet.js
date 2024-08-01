/**
 * Reverses the alphabetic characters in a string while keeping numbers at the end.
 * @param {string} str
 * @returns {string}
 */
function reverseAlphabet(str) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const reversedAlphabet = alphabet.split("").reverse().join("");
  const regex = new RegExp(`[${alphabet}]`, "gi");
  return str.replace(regex, (char) => {
    const isUpperCase = char === char.toUpperCase();
    const index = alphabet.indexOf(char.toLowerCase());
    return isUpperCase ? reversedAlphabet[index].toUpperCase() : reversedAlphabet[index];
  });
}

module.exports = reverseAlphabet;
