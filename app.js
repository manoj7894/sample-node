import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

app.listen(PORT, () => {
    console.log('Sever started and running at ${PORT}')
})

mongoose.connect(MONGOURL).then( ()=>{
    console.log("Database is connected successfully.")    
})
.catch((error)=>console.log(error));

// mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const UserModel = mongoose.model("user", userSchema)

app.get("/getUsers", async(req, res)=>{
    const userData = await UserModel.find();
    res.json(userData);
});