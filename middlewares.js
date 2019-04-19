import multer from "multer";

const multerVideo= multer({dest: "videos/"});

export const uploadVideo = multerVideo.single("videoFile");