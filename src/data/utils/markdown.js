const marked = require('marked')
const highlight = require('highlight.js')

const renderer = new marked.Renderer()

// Override function

renderer.heading = function (text, level) {
  return `<h${level} class="post-title">
      ${text}
    </h${level}>`
}

renderer.code = function (code, infostring, escaped) {
  const lines = code.split('\n')
  let lineNumbers = ''
  let lineContent = ''
  let i = 1

  for (const line of lines) {
    lineNumbers += `<div class="line">${i}</div>`
    lineContent += `<div class="line">${line.replace(/</g, '˂')} </div>`
    i += 1
  }

  return `<code>
      <div class="pure-g rounded">
        <div class="pure-u-1-8">
          <pre class="lineNumbers">
            ${lineNumbers}
          </pre>
        </div>
        <div class="pure-u-7-8">
          <pre class="code">
            ${lineContent}
          </pre>
        </div>
      </div>
    </code>
  </pre>`
}
/*
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
*/
renderer.paragraph = function (text) {
  return `<p>&emsp;${text}</p>`
}
/*
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
*/
renderer.codespan = function (code) {
  return `<p>
    <code>${code}</code>
  </p>`
}
/*
renderer.br = function () {
  return ``
}

renderer.del = function (text) {
  return ``
}

renderer.link = function (href, title, text) {
  return ``
}
*/
renderer.image = function (href, title, text) {
  return `<img class="pure-img-responsive" src="${href}" alt="${title} - ${text}"/>`
}
/*
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
