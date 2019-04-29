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
export const videoDetail= async(req, res) => {

    const id = req.params.id;
    try{
        const video = await Videos.findById(id);
        res.render("videoDetail", {pageTitle : video.title, video});
    }
    catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
    
}
export const getEditVideo = async(req, res) => {
    const id=req.params.id;
    
    try{
        const video=await Videos.findById(id);
        res.render("editVideo", {pageTitle : `Edit Video ${video.title}`, video});
    }
    catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
    
}

export const postEditVideo=async(req,res) => {
    
    const id=req.params.id;

    try{
        //변수로 따로 저장하지 않는 이유는 그냥 업데이트만 하면 되기 때문, 거기서 정보를 가져오거나 하지 않음
        await Videos.findByIdAndUpdate(
            id, 
            {$set:{
                title: req.body.title,
                description:req.body.description
            }}
            
        )
        
        res.redirect(routes.videoDetail(id));
    }
    catch{
        res.redirect(routes.home);
    }
    
}

export const deleteVideo= async(req, res) => {
    const id=req.params.id;

    try{
        await Videos.findByIdAndRemove(id);
        res.redirect(routes.home);
    }
    catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
    
}
