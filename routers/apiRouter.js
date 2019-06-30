import express from "express";
import routes from "../routes";
import {postregisterView} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postregisterView);

export default apiRouter;
