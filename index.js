// Ejercicio 1: crear servidor HTTP con Node
const http = require('node:http')
const fs = require('node:fs')

const processToReq = (req, res) => {
  const { method, url } = req
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
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
          res.statusCode = 404
          res.end('<h1>404</h1>')
          break
        }
        default: {
          res.statusCode = 405
          return res.end('<h1>405</h1>')
        }
      }
      break
    }
    case 'POST': {
      switch (url) {
        case '/contacto': {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            })
            res.end(JSON.stringify(data))
          })
          break
        }
        default: {
          res.statusCode = 405
          res.setHeader('Content-Type', 'text/plain: charset=utf-8')
          return res.end('<h1>405</h1>')
        }
      }
      break
    }
    default: {
      res.statusCode = 405
      return res.end('<h1>405</h1>')
    }
  }
}

const port = process.env.PORT ?? 1234

function startServer () {
  const server = http.createServer(processToReq)

  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}/`)
  })
  return server
}

module.exports = {
  startServer
}
