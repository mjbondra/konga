module.exports = {
  missing: {
    argument: 'Include valid arguments.\n\nExample: konga new example\nExample: konga save my_new_template',
    directory: 'Include a directory name for your project.\n\nExample: konga new example\nExample: konga new example default',
    name: 'Include a name for your template.\n\nExample: konga save my_new_template',
    template: function (src) {
      return src + ' was not found.';
    }
  },
  notEmpty: {
    directory: function (dir) {
      return dir + ' is not an empty directory.\n\nInclude a new directory name.';
    }
  },
  validation: {
    key: function (key) {
      return key + ' is not a valid key.\n\nThis template should not be trusted.';
    }
  }
};
