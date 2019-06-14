module.exports = function getHead (title, description, url, image) {
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <link rel="apple-touch-icon" sizes="57x57" href="/images/57.png">
  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/images/57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/images/60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/images/72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/images/76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/images/114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/images/120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/images/144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/images/152.png">
  <link rel="apple-touch-icon" sizes="167x167" href="/images/167.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/180.png">

  <link rel="shortcut icon" href="/images/16.png">
  <link rel="icon" type="image/vnd.microsoft.icon" href="/images/16.png">
  <link rel="icon" type="image/x-icon" href="/images/16.png">
  <link rel="icon" href="/images/16.png">

  <link rel="icon" type="image/png" sizes="16x16" href="/images/16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/32.png">
  <link rel="icon" type="image/png" sizes="128x128" href="/images/128.png">
  <link rel="icon" type="image/png" sizes="256x256" href="/images/256.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/images/512.png">
  <link rel="icon" type="image/png" sizes="1024x1024" href="/images/1024.png">

  <meta name="application-name" content="CultState">
  <meta name="msapplication-TileImage" href="/images/144.png">
  <meta name="msapplication-TileColor" content="#344979">

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
