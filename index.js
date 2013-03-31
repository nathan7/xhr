var Promise = require('promise')
  , xhr = require('xhr')
module.exports = function(value) {
  return new Promise(function(resolve, reject) {
    xhr(value, resolve, reject)
  })
}
