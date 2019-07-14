const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default

const paths = []

exports.addPath = (path, lastMod) => {
  paths.push({
    path,
    lastMod: lastMod || path.slug.split('/').slice(0, 3).join('/'),
    priority: '0.8',
    changeFreq: 'monthly'
  })
}

exports.getPlugin = function getSitemap () {
  return new SitemapWebpackPlugin('https://cultstate.com', paths)
}
