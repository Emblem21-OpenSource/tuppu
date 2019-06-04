function sectionHtml (entry) {
  return `
  <header class="post-header">
    <section class="post">
      <h2 class="post-title">
        <a href="/${entry.slug}">${entry.title}</a>
      </h2>
      <p class="post-meta">
        By <a class="post-author" href="${entry.contact}">
          ${entry.author}
        </a> on <span class="post-date">${entry.date}</span>
      </p>
      <div class="post-description">
        ${entry.html}
      </div>
    </section>
  </header>`
}

module.exports = sectionHtml
