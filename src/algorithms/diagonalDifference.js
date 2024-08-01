/**
 * Calculates the difference between the sums of the diagonals in a matrix.
 * @param {array} matrix
 * @returns {number}
 */
function diagonalDifference(matrix) {
  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][n - 1 - i];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

module.exports = diagonalDifference;
