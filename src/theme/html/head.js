module.exports = function getHead (title, description, url, image) {
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="title" content="${title || 'You are more than your identity'}">
  <meta name="description" content="${description || 'You are more than your identity'}">

  <meta property="og:title" content="${title}">
  <meta property="og:site_name" content="CultState">
  <meta property="og:url" content="https://cultstate.com${url}">
  <meta property="og:description" content="${description || 'You are more than your identity'}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://cultstate.com/images/${image || 'open_graph.jpg'}">

  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:site_name" content="CultState">
  <meta property="twitter:url" content="https://cultstate.com${url}">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description || 'You are more than your identity'}">
  <meta property="twitter:image" content="https://cultstate.com/images/${image || 'open_graph.jpg'}">

  <title>CultState - ${title || 'You are more than your identity'}</title>`
}
