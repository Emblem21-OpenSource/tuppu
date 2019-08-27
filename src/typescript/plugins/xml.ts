import handlebars from 'handlebars'
import fs from 'fs'
import { join } from 'path'

interface File {
  templateString: string
  data: string
  filename: string
  path: string
  writeToContext: boolean
}

class HandlebarXMLWebpackPlugin {
  files: File[]
  options: object

  constructor(options) {
    this.files = options.files || []
    this.options = options.templateOptions || {}
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'HandlebarXMLWebpackPlugin',
      (compilation, callback) => {
        let compileFailed = false
        // Compile all templates
        Promise.all(
          this.files.map(file => new Promise((resolve) => {
            try {
              const template = handlebars.compile(file.data)
              file.templateString = template(this.options)
             } catch (err) {
               compilation.errors.push(err)
               compileFailed = true
             }
            resolve()
          }))
          /*
            ejs.renderFile(file.template, file.data, {}, (err, templateString) => {
              if (err) {
                compilation.errors.push(err)
                compileFailed = true
              }
              file.templateString = templateString
              resolve()
            })
          }))
          */
        ).then(() => {
          // Only continue when compiling templates did not fail
          if (compileFailed) {
            callback()
            return
          }
          // Split into assets and files to be written to context folder
          const xmlFilesForContext = []
          this.files.forEach((file) => {
            if (!file.filename) {
              compilation.errors.push('XMLWebpackPlugin filename missing', file)
              return
            }
            const xmlPath = file.path || ''
            let xmlFilename = join(xmlPath, file.filename)
            const xmlContent = file.templateString
            if (file.writeToContext) {
              // File must be written inside context
              xmlFilename = join(compiler.context, xmlFilename)
              const file = {
                filename: xmlFilename,
                content: xmlContent
              }
              xmlFilesForContext.push(file as never)
            } else {
              // Regular asset
              compilation.assets[xmlFilename] = {
                source: () => xmlContent,
                size: () => xmlContent.length
              }
            }
          })
          // Write files to context folder
          if (xmlFilesForContext.length === 0) {
            // Nothing to write to context folder, we're done
            callback()
            return
          }
          Promise.all(
            xmlFilesForContext.map(xmlFile => new Promise((resolve) => {
              const filename: string = (xmlFile as any).filename 
              const content: string = (xmlFile as any).content

              fs.writeFile(filename, content, (err) => {
                if (err) {
                  compilation.errors.push(err)
                }
                resolve()
              })
            }))
          ).then(() => {
            callback()
          })
        }).catch(() => {
          callback()
        })
      }
    )
  }
}

module.exports = HandlebarXMLWebpackPlugin