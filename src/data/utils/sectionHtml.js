const moment = require('moment')
moment.locale('en')

function sectionHtml (entry) {
  let header = ''
  if (!entry.index) {
    header = `<h2 class="post-title">
      <a href="/${entry.slug}">${entry.title}</a>
    </h2>
    <p class="post-meta">
      By <a class="post-author" href="${entry.contact}">
        ${entry.author}
      </a> on <span class="post-date">${moment(entry.datetime).format('LLLL')}</span>
    </p>`
  }

  return `<section class="post">
    <header class="post-header">
      ${header}
    </header>
    <div class="post-description">
      ${entry.html}
    </div>
  </section>`
}

module.exports = sectionHtml
