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
const ME="/me";


//VIDEOS

const VIDEOS="/videos";
const UPLOAD="/upload";
const VIDEO_DETAIL="/:id";
const EDIT_VIDEO="/:id/edit-video";
const DELETE_VIDEO="/:id/delete-video";

//GITHUB
const GITHUB="/auth/github";
const GITHUB_CALLBACK="/auth/github/callback";

//GOOGLE
const GOOGLE="/auth/google";
const GOOGLE_CALLBACK="/auth/google/callback";

//API
//유저가 클릭해서 갈 수 있는 곳이 아님, doesn't render anything
const API="/api";
const REGISTER_VIEW="/:id/view";
const ADD_COMMENT="/:id/comment";
const DELETE_COMMENT="/:id/delete-comment"

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
        }else{
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
        }else{
            return VIDEO_DETAIL;
        }
    },
    editVideo:(id) => {
        if(id){
            return `/videos/${id}/edit-video`;
        }else{
           return EDIT_VIDEO;
        }
        
    },
    deleteVideo:(id) => {
        if(id){
            return `/videos/${id}/delete-video`;
        }else{
            return DELETE_VIDEO;
        }
        
    },
    github: GITHUB,
    github_callback: GITHUB_CALLBACK,
    google: GOOGLE,
    google_callback: GOOGLE_CALLBACK,
    me: ME,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT
};

export default routes;
