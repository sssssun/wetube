//videoController 에서 fake database(db.js)에서 비디오 목록 받아옴 
//이제 제대로 된 db model에서 비디오 목록 받아오도록 함
import routes from "../routes";
import Videos from "../models/Video";

export const home= async (req , res) => {
    try{
        const videos=await Videos.find({});
        res.render("home", {pageTitle : "HOME", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle : "HOME", videos});
    }
};

export const search=(req , res) => {
    const searchingBy = req.query.term;
    res.render("search", {pageTitle : "Search", searchingBy : searchingBy, videos});
};

export const getUpload=(req, res) => {
    res.render("upload", {pageTitle : "Upload"});
}
export const postUpload=async (req,res) => {
    const uploadInfo={
        file : req.file.path,
        title : req.body.title,
        description: req.body.description
    }
    //console.log(uploadInfo.body, uploadInfo.file);
    const newVideo=await Videos.create({
        fileUrl: uploadInfo.file,
        title : uploadInfo.title,
        description : uploadInfo.description
    })
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}
export const videoDetail=(req, res) => res.render("videoDetail", {pageTitle : "Video Detail"});
export const editVideo=(req, res) => res.render("editVideo", {pageTitle : "Edit Video"});
export const deleteVideo=(req, res) => res.render("deleteVideo", {pageTitle : "Delete Video"});
