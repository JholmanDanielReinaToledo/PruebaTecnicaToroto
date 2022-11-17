import mongoose from 'mongoose'

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI

const connection = {} /* creating connection object */

async function dbConnect () {
  /* check if we have connection */
  if (connection.isConnected) {
    return
  }

  /* connecting */
  const db = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
  })

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
