const fs = require("fs")
const rimraf = require("rimraf")

/**
 *
 * @param {object} webpackEncoreConfig Webpack Encore object, so we can use Encore methods
 */
function WebpackEncoreZeroDowntime(webpackEncoreConfig) {
  const configJson = webpackEncoreConfig.getWebpackConfig()
  const outputPath = configJson.output.path
  const outputTempPath = configJson.output.path + "@tmp"
  const publicPath = configJson.output.publicPath

  webpackEncoreConfig.setOutputPath(outputTempPath)
  webpackEncoreConfig.setPublicPath(publicPath)

  this.options = configJson
  this.outputPath = outputPath
  this.outputTempPath = outputTempPath
  this.publicPath = publicPath
}

WebpackEncoreZeroDowntime.prototype.apply = function(compiler) {
  compiler.hooks.done.tap("WebpackEncoreZeroDowntime", compilation => {
    if (fs.existsSync(this.outputPath)) {
      rimraf(this.outputPath + "_old", () => {
        fs.rename(this.outputPath, this.outputPath + "_old", err => {
          if (err) {
            console.log(err)
          } else {
            fs.rename(this.outputTempPath, this.outputPath, err => {
              if (err) {
                console.log(err)
              } else {
                rimraf(this.outputPath + "_old", () => {})
              }
            })
          }
        })
      })
    } else {
      fs.rename(this.outputTempPath, this.outputPath, function(err) {
        if (err) {
          console.log(err)
        } else {
          rimraf(this.outputPath + "_old", () => {})
        }
      })
    }
    return true
  })
}

module.exports = WebpackEncoreZeroDowntime
