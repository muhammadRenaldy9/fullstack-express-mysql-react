import express from "express";
import cors from "cors";
import UserRoute from './routes/UserRoute.js';
import db from "./config/Database.js"
//new jwt
// import Admins from "./models/AdminModel.js";        //matikan jika table sudah terbuat
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config()

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected');
    // await Admins.sync();                //matikan jika table sudah terbuat
} catch (error) {
    console.log(error);
}
//panggil sebagai middleware
app.use(cors());
app.use(express.json());
app.use(UserRoute);
//new jwt
app.use(cookieParser());

app.listen(5000, () => console.log('server running'));