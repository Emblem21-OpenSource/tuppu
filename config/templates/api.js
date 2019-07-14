const WriteJsonPlugin = require('write-json-webpack-plugin')
const { addPath } = require('./sitemap')
const moment = require('moment')

module.exports = function getApiTemplate (filename) {
  const json = require(`../../src/api/${filename}`)
  addPath(`api/index.json`, moment().format('YYYY/MM/DD'))

  // @TODO paginate this stuff right

  return new WriteJsonPlugin({
    object: json,
    path: 'api',
    filename,
    pretty: true
  })
}
