//home, join, search...

import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getLogin, postLogin, logout, getJoin, postJoin, 
    githubLogin, githubLoginCallback, postGithub, instagramLogin, instagramLoginCallback, postInstagram} from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home,home);
globalRouter.get(routes.search,search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join,onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login,onlyPublic,getLogin);
globalRouter.post(routes.login,onlyPublic,postLogin);

globalRouter.get(routes.logout,logout);

globalRouter.get(routes.github,githubLogin);
globalRouter.get(routes.github_callback,githubLoginCallback,postGithub);
globalRouter.get(routes.instagram, instagramLogin);
globalRouter.get(routes.instagram_callback, instagramLoginCallback, postInstagram);

export default globalRouter;
