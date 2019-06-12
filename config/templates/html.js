const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getStaticTemplate (section, sectionName) {
  return new HtmlWebpackPlugin({
    template: `src/theme/sections/${section}`,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename: `${sectionName}.html`
  })
}
