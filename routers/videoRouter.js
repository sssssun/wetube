import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos,(req, res) => res.send(""));
videoRouter.get(routes.videoDetail,(req, res) => res.send(""));
videoRouter.get(routes.upload,(req, res) => res.send(""));
videoRouter.get(routes.editVideo,(req, res) => res.send(""));
videoRouter.get(routes.deleteVideo,(req, res) => res.send(""));

export default videoRouter;
