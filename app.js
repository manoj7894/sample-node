import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then( ()=>{
    console.log("Database is connected successfully.");
    app.listen(PORT, () => {
        console.log('server is running on port ${PORT}');
    });
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