const app = require('./app')

const connectDB = require('./mongodb/connect')

require('dotenv').config()

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080, () => console.log('Server started on port 8080'))
  } catch (error) {
    console.log(error)
  }
}

startServer()
