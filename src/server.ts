import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function server() {
  try {
    await mongoose.connect(config.databaseURL as string)

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server().catch(err => console.log(err))