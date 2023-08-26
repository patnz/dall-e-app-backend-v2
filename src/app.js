const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const postRoutes = require('./api/postRoutes')
const dalleRoutes = require('./api/dalleRoutes')

require('dotenv').config()

const middlewares = require('./middlewares')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', async (req, res) => {
  res.send('Hello from DALL-E!')
})

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app
