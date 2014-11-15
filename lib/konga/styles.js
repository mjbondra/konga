/**
 * Style error messages
 *
 * @param {string} msg - message to style
 * @returns {string} - styled string
 */
exports.error = function (msg) {
  return '\x1b[31m' + msg + '\x1b[0m'; // red text
};

/**
 * Style success messages
 *
 * @param {string} msg - message to style
 * @returns {string} - styled string
 */
exports.success = function (msg) {
  return '\x1b[32m' + msg + '\x1b[0m'; // green text
};
