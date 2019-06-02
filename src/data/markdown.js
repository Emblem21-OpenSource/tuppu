const marked = require('marked')
const highlight = require('highlight.js')

const renderer = new marked.Renderer()

// Override function
/*
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

  return `
    <h${level}>
      <a name="${escapedText}" class="anchor" href="#${escapedText}">
        <span class="header-link"></span>
      </a>
      ${text}
    </h${level}>`
}

renderer.code = function (code, infostring, escaped) {
  return ``
}

renderer.blockquote = function (quote) {
  return ``
}

renderer.html = function (html) {
  return ``
}

renderer.heading = function (text, level, raw, slugger) {
  return ``
}

renderer.hr = function () {
  return ``
}

renderer.list = function (body, ordered, start) {
  return ``
}

renderer.listitem = function (text, task, checked) {
  return ``
}

renderer.checkbox = function (checked) {
  return ``
}

renderer.paragraph = function (text) {
  return ``
}

renderer.table = function (header, body) {
  return ``
}

renderer.tablerow = function (content) {
  return ``
}

renderer.tablecell = function (content, flags) {
  return ``
}

renderer.strong = function (text) {
  return ``
}

renderer.em = function (text) {
  return ``
}

renderer.codespan = function (code) {
  return ``
}

renderer.br = function () {
  return ``
}

renderer.del = function (text) {
  return ``
}

renderer.link = function (href, title, text) {
  return ``
}

renderer.image = function (href, title, text) {
  return ``
}

renderer.text = function (text) {
  return ``
}
*/

marked.setOptions({
  renderer,
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

module.exports = marked
