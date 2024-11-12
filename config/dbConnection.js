const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected ", 
            connect.connection.host,
            connect.connection.NAME
        );
    }catch(err){
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // this line of code process with a failure code
    }
}

module.exports = connectDB