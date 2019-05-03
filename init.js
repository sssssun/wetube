import "./db";
import dotenv from "dotenv";
import app from "./app";
//모델 등록
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT= process.env.PORT || 4000;

const handelListening = () => 
    console.log(`Listening http://localhost:${PORT}`);

app.listen(PORT,handelListening);