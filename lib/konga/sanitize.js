/**
 * Prevent the use of relative paths
 *
 * @param {string} val - string to sanitize
 * @returns {string} - sanitized string
 */
module.exports = function (val) {
  return String(val).replace(/\.\.|\.\/|\//g, '');
};
