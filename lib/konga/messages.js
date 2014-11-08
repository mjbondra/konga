module.exports = {
  missing: {
    directory: 'Include a directory name for your project.\n\nExample: konga new example\nExample: konga new example default',
    name: 'Include a name for your template.\n\nExample: konga save my_new_template',
    template: function (src) {
      return src + ' was not found.';
    }
  }
};
