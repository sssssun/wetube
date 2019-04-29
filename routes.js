//GLOBAL

const HOME="/";
const JOIN="/join";
const LOGIN="/login";
const LOGOUT="/logout";
const SEARCH="/search";


//USERS

const USERS="/users";
const USER_DETAIL="/:id";
const EDIT_PROFILE="/edit-profile";
const CHANGE_PASSWORD="/change-password";


//VIDEOS

const VIDEOS="/videos";
const UPLOAD="/upload";
const VIDEO_DETAIL="/:id";
const EDIT_VIDEO="/:id/edit-video";
const DELETE_VIDEO="/:id/delete-video";

//Object

const routes={
    home:HOME,
    join:JOIN,
    login:LOGIN,
    logout:LOGOUT,
    search:SEARCH,
    users:USERS,
    userDetail:(id) => {
        if(id){
            return `/users/${id}`;
        }
        else{
            return USER_DETAIL;
        }
    },
    editProfile:EDIT_PROFILE,
    changePassword:CHANGE_PASSWORD,
    videos:VIDEOS,
    upload:UPLOAD,
    videoDetail:(id) => {
        if(id){
            //return 에서 videos 앞에 /를 없애면 videos/videos/303030이 됨,, ㄷ
            //videos 앞에 /가 있어야 됨
            return `/videos/${id}`;
        }
        else{
            return VIDEO_DETAIL;
        }
    },
    editVideo:(id) => {
        if(id){
            return `/videos/${id}/edit-video`;
        }
        else{
           return EDIT_VIDEO;
        }
        
    },
    deleteVideo:(id) => {
        if(id){
            return `/videos/${id}/delete-video`;
        }
        else{
            return DELETE_VIDEO;
        }
        
    }
};

export default routes;
