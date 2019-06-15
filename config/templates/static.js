const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getStaticTemplate (section, sectionName) {
  const title = sectionName[0].toUpperCase() + sectionName.substr(1)

  return new HtmlWebpackPlugin({
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    filename: `${sectionName}.html`,
    template: `src/theme/sections/${section}`,
    templateParameters: {
      head: {
        title,
        description: title,
        image: 'open_graph.jpg'
      }
    }
  })
}
