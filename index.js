var hop = ({}).hasOwnProperty
  , Promise = require('promise')
  , xobj = require('xhr')

module.exports =
function xhr(url, options) {
  var req = xobj()

  if(typeof url === 'object')
    options = url, url = null
  if (!url)
    url = options.url
  if (!options)
    options = {}

  req.open(options.method || 'GET', url, true)

  if(options.credentials)
    req.withCredentials = true 
  if (options.headers) for (var key in options.headers) if (hop.call(key, options.headers))
    req.setRequestHeader(key, options.headers[key])

  return new Promise(function(resolve, reject) {
    req.onload = function() {
      if(req.status < 400)
        augment({}, resolve)
      else
        augment(new Error('Server responded with a status of ' + req.status), reject)

      function augment(res, cb) {
        res.status = req.status
        res.headers = parseHeaders(req)
        res.body = req.responseText
        cb(res)
      }
    }
    req.onerror = reject

    req.send(options.data || void 0)
  })
}

function parseHeaders(xhr) {
  var text = xhr.getAllResponseHeaders().split('\n')
    , headers = {}
    , m
  for (var i = 0, len = text.length; i < len; i++) if(text[i])
    if (m = text[i].match(/^([^:]+): (.*)/))
      headers[m[1].toLowerCase()] = m[2]
  return headers
}