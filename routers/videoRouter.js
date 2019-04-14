import express from "express";
import routes from "../routes";
import { videos, videoDetail, upload, editVideo, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/",videos);
videoRouter.get(routes.upload,upload); 
videoRouter.get(routes.videoDetail,videoDetail);
videoRouter.get(routes.editVideo,editVideo);
videoRouter.get(routes.deleteVideo,deleteVideo);

export default videoRouter;
