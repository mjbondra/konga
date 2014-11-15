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
 * Remove .json from filename; optionally add an extension
 *
 * This prevents edge cases like: example.json.json
 *
 * @param {string} filename - filename to sanitize
 * @param {string} extension - extension to add to sanitized filename
 * @returns {string} - sanitized filename
 */
exports.extension = function (filename, extension) {
  return String(filename).replace(/\.json/gi, '') + (extension || '');
};
