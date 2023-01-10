import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { userRouter } from './routes/loginRouter';
import cors from 'cors';
import { User } from './models/loginUserModel';

dotenv.config();

const app = express();


const MONGO_URI = 'mongodb://mongodb:27017/shareenergy';


mongoose.set("strictQuery", true);


mongoose.connect(MONGO_URI).then(() => {
  console.log('Connect to DB');
}).catch((err) => {
  console.log(err.message);
})

const seedUser = [
  {
    username: 'desafiosharenergy',
    password: bcrypt.hashSync('sh@r3n3rgy')
  }
]

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUser);
};



seedDB();

app.use(cors());
app.use(express.json());
app.use(userRouter)

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

