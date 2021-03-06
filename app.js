import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import mongoStore from "connect-mongo";
import mongoose from "mongoose";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";

import "./passport";

const app = express();

const CookieStore = mongoStore(session);


app.set("view engine","pug");
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store : new CookieStore({mongooseConnection: mongoose.connection})
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);
app.use(routes.api, apiRouter);


export default app;
