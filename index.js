var _xhr = typeof window == 'undefined'
  ? require('./node')
  : require('./browser')

module.exports = function xhr(url, options) {
  if (typeof url === 'object')
    options = url, url = null
  if (!url)
    url = options.url
  if (!options)
    options = {}
  return _xhr(url, options)
}
