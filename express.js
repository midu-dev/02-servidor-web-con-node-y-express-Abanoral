// Ejercicio 2: crear servidor HTTP con Express
const express = require('express')
const fs = require('node:fs')
const app = express()

const PORT = process.env.PORT ?? 1234

app.use(express.json())
app.use(express.static('assets'))

app.all('/', (req, res) => {
  if (req.method === 'GET') {
    return res.send('<h1>¡Hola mundo!</h1>')
  }
  res.status(405)
})

app.get('./logo.webp', (req, res) => {
  if (req.method === 'GET') {
    fs.readFile('./logo.webp', (err, data) => {
      if (err) {
        return res.status(500).send('<h1>Internal server error</h1>')
      } else {
        return res.send(data)
      }
    })
  }
  res.status(405)
})

app.all('/404', (req, res) => {
  if (req.method === 'GET') { return res.status(404).send('<h1>404</h1>') }
  res.status(405)
})

app.all('/contacto', (req, res) => {
  if (req.method === 'POST') { return res.status(201).json(req.body) }
  res.status(405)
})

app.use((req, res, next) => {
  res.status(404)
  next()
})

function startServer () {
  const server = app.listen(PORT)
  return server
}

module.exports = {
  startServer
}
