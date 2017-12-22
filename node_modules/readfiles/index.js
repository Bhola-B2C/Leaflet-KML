var fs = require('fs')
var async = require('async')

module.exports = function(files,cb) {
  functions = []
  files.forEach(function(v,i) {
    functions[i] = generateFsRead(v)
  })
  async.parallel(functions,cb)
}

function generateFsRead(file) {
  return function(cb) {
    fs.readFile(file,"utf-8",cb)
  }
}
