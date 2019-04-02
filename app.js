const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')

const phones = require('./routes/phones')

require('dotenv').config()

mongoose
  .connect(process.env.DATABASE, {useNewUrlParser: true})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Connected to ${process.env.DATABASE} database`)
  })
  .catch(error => {
    mongoose.connection.close()
    throw error
  })

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  }),
)

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: 'some-string',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api', phones)

app.use((req, res, next) => {
  res.status(404)
  res.json({code: 'not found'})
})

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err)

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500)
    res.json({code: 'unexpected'})
  }
})

module.exports = app
