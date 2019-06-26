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
        <div class="pure-u-1-8 lineNumberContainer">
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
*/
renderer.list = function (body, ordered, start) {
  if (ordered) {
    return `<div class="toc"><ol>${body}</ol></div>`
  } else {
    return `<ul>${body}</ul>`
  }
}

renderer.listitem = function (text, task, checked) {
  return `<li>${text}</li>`
}
/*
renderer.checkbox = function (checked) {
  return ``
}
*/
const tabRegex = /--&gt; /g
renderer.paragraph = function (text) {
  if (text.indexOf('&lt;&gt; ') === 0) {
    // Dealing with a table
    const cells = text.substr(9)
      .trim()
      .split('<br>&lt;&gt; ')
      .map(item => item.replace('href="', 'class="pure-button" href="'))
    const spacing = 3

    let result = ''

    for (var i = 0; i < cells.length;) {
      result += `<tr>
        <td>${cells[i] || ''}</td>
        <td>${cells[i + 1] || ''}</td>
        <td>${cells[i + 2] || ''}</td>
      </tr>`
      i += spacing
    }

    return `<table class="tableOptions"><thead /><tbody>${result}</tbody></table>`
  } else {
    console.log('>>>', text)
    return `<p>${text.replace(tabRegex, '&emsp;')}</p>`
  }
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
  return `<code class="code-one-line">${code}</code>`
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
