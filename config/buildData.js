const data = {}

/**
 * [set description]
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
function setBuildData (key, value) {
  if (data[key] instanceof Array) {
    data[key].push(value)
  } else {
    data[key] = value
  }
}

/**
 * [get description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getBuildData (key) {
  if (data[key] instanceof Array) {
    return data[key][0]
  } else {
    return data[key]
  }
}

/**
 * [clear description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function clearBuildData (key) {
  if (data[key] instanceof Array) {
    data[key].shift()
  } else {
    delete data[key]
  }
  return ''
}

global.setBuildData = setBuildData
global.getBuildData = getBuildData
global.clearBuildData = clearBuildData

exports.setBuildData = setBuildData
exports.getBuildData = getBuildData
exports.clearBuildData = clearBuildData
