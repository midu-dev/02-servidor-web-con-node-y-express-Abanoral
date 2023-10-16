// Ejercicio 1: crear servidor HTTP con Node
const http = require('node:http')
const fs = require('node:fs')

const processToReq = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET': {
      switch (url) {
        case '/': {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end('<h1>¡Hola mundo!</h1>')
          break
        }
        case '/logo.webp': {
          fs.readFile('./assets/logo.webp', (err, data) => {
            if (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end('<h1>Internal server error</h1>')
            } else {
              res.setHeader('Content-Type', 'image/webp')
              res.end(data)
            }
          })
          break
        }
        case '/404': {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end('<h1>404</h1>')
          break
        }
        default: {
          res.statusCode = 404
          break
        }
      }
      break
    }
    default: {
      res.statusCode = 405
      break
    }
  }
}

const port = process.env.PORT ?? 1234

function startServer () {
  const server = http.createServer(processToReq)

  server.listen(port, () => {
    const { port } = server.address()
    console.log(`server listening on port http://localhost:${port}/`)
  })
  return server
}

module.exports = {
  startServer
}
