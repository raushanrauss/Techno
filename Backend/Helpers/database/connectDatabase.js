const mongoose = require("mongoose")
require('dotenv').config();
const connectDatabase = async () => {
    const MongoUri = process.env.MONGO_URI
   

    await mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser : true})

    console.log("MongoDB Connection Successfully")

}

module.exports = connectDatabase
