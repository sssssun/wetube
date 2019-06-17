//home, join, search...

import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getLogin, postLogin, logout, getJoin, postJoin, 
    githubLogin, githubLoginCallback, postGithub, googleLogin, googleLoginCallback, postGoogle, getMe} from "../controllers/userController";
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
globalRouter.get(routes.google,googleLogin);
globalRouter.get(routes.google_callback,googleLoginCallback, postGoogle);

globalRouter.get(routes.me, getMe);

export default globalRouter;
