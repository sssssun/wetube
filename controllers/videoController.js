//videoController 에서 fake database(db.js)에서 비디오 목록 받아옴 
import {videos} from "../db";
import routes from "../routes";

export const home=(req , res) => {
    res.render("home", {pageTitle : "HOME", videos});
};

export const search=(req , res) => {
    const searchingBy = req.query.term;
    res.render("search", {pageTitle : "Search", searchingBy : searchingBy, videos});
};

export const getUpload=(req, res) => {
    res.render("upload", {pageTitle : "Upload"});
}
export const postUpload=(req,res) => {
    const videoInfo={
        name:req.body.name,
        title:req.body.title,
        description:req.body.description
    }
    //To do : Upload and Save video
    res.redirect(routes.videoDetail(303030));
}
export const videoDetail=(req, res) => res.render("videoDetail", {pageTitle : "Video Detail"});
export const editVideo=(req, res) => res.render("editVideo", {pageTitle : "Edit Video"});
export const deleteVideo=(req, res) => res.render("deleteVideo", {pageTitle : "Delete Video"});
