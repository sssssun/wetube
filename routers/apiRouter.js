import express from "express";
import routes from "../routes";
import {postregisterView, postaddComment, postDeleteComment} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postregisterView);
apiRouter.post(routes.addComment,postaddComment);
apiRouter.post(routes.deleteComment,postDeleteComment);

export default apiRouter;
