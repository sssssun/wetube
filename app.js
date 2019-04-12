import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {userRouter} from "./userRouter";
const app = express();


// const betweenHome = (req,res,next) =>{
//     console.log("Between");
//     next();
// };

const handleHome = (req,res) => res.send('hello');

const handleProfile = (req,res) => res.send('This is profile');

// const middleware = (req, res, next) => {
//     res.send('not happening');
// }


//순서 중요 
// app.use(betweenHome);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', handleHome);
app.get('/profile',handleProfile);

app.use('/user',userRouter);

export default app;
 