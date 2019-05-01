import "./db";
import dotenv from "dotenv";
import app from "./app";
import "./models/Video";
import "./models/Comment";

dotenv.config();

const PORT= process.env.PORT || 4000;

const handelListening = () => 
    console.log(`Listening http://localhost:${PORT}`);

app.listen(PORT,handelListening);