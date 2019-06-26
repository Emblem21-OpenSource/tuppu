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

  return `
  <header class="post-header">
    <section class="post">
      ${header}
      <div class="post-description">
        ${entry.html}
      </div>
    </section>
  </header>`
}

module.exports = sectionHtml
