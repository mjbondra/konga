/**
 * Prevent the use of relative paths in keys
 *
 * @param {string} key - string to sanitize
 * @returns {string} - sanitized string
 */
exports.key = function (key) {
  return String(key).replace(/\.\.|\.\/|\//g, '');
};

/**
 * Prevent extensions from being duplicated
 *
 * Example: example.json.json
 *
 * @param {string} key - string to sanitize
 * @returns {string} - sanitized string
 */
exports.extension = function (ext) {
  return String(ext).replace(/\.json/gi, '') + '.json';
};
