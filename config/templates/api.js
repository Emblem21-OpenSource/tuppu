const WriteJsonPlugin = require('write-json-webpack-plugin')

module.exports = function getApiTemplate (filename) {
  const json = require(`../../src/api/${filename}`)

  // @TODO paginate this stuff right

  return new WriteJsonPlugin({
    object: json,
    path: 'api',
    filename,
    pretty: true
  })
}
