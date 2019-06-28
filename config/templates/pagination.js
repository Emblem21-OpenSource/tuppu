module.exports = function getPagination (sectionName, pages, articlesPerPage, currentPage, currentArticles) {
  const filename = currentPage === 0
    ? `${sectionName}.html`
    : sectionName === 'index'
      ? `page/${(currentPage + 1)}/index.html`
      : `${sectionName}/page/${(currentPage + 1)}/index.html`

  const previous = currentPage === 1
    ? `/${sectionName}.html`
    : sectionName === 'index'
      ? `/page/${(currentPage)}/index.html`
      : `/${sectionName}/page/${(currentPage)}/index.html`

  const next = sectionName === 'index'
    ? `/page/${(currentPage + 2)}/index.html`
    : `/${sectionName}/page/${(currentPage + 2)}/index.html`

  let pagination = {
    previous: `<a class="pure-button button-navigation previous" href="${previous}">Previous</a>`,
    next: `<a class="pure-button button-navigation next" href="${next}">Next</a>`
  }

  if (currentPage === 0 && currentArticles.length >= (articlesPerPage - 1)) {
    pagination.previous = ''
  }

  if (currentPage >= (pages - 1)) {
    pagination.next = ''
  }

  return { filename, pagination }
}
