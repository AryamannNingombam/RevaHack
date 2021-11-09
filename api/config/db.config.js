const mongoose = require('mongoose');

exports.ConnectToDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
}