import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!) // ! means that we are 100% sure that string will comes here

        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("MongoDb connected");
        })
        connection.on('error', (err) => {
            console.log("MongoDb connection error, please make sure db is up and running: " + err);
            process.exit()
        })
    } catch (error) {
        console.log("something went wrong in connecting to DB");
        console.log(error);
    }
}