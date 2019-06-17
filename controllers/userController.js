import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin=(req , res) => {
    res.render("Join", {pageTitle:"Join"});
}

export const postJoin= async(req, res, next) => {
    //console.log(req.body);
    const joinInfo= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2 : req.body.password2
    }

    if(joinInfo.password!==joinInfo.password2){
        res.status(400);
        res.render("Join", {pageTitle:"Join", joinInfo});
    }else{
        //password 같으면
        try{
            //user register
            const user = await User({name: joinInfo.name, email:joinInfo.email});

            await User.register(user, joinInfo.password);

            //postLogin으로 넘어가도록 함
            next();

        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }
}

export const getLogin=(req , res) => {
    res.render("Login", {pageTitle: "Log in"})
}

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin=passport.authenticate("github");

export const githubLoginCallback=passport.authenticate("github",{ failureRedirect: '/login' });
    

export const postGithub=(req, res) => {
    res.redirect(routes.home);
}

export const googleLogin = passport.authenticate("google", {scope: ["email","profile"]});

export const googleLoginCallback = passport.authenticate("google", {failureRedirect : '/login'});

export const postGoogle=(req, res) => {
    res.redirect(routes.home);
}


export const logout=(req , res) => {
    //To do : Process Logout
    req.logout();
    res.redirect(routes.home);
}
export const users=(req,res) => res.render("users");

export const getMe=(req,res) => {
    res.render("userDetail", {pageTitle: "User Detail", user: req.user});
}

export const userDetail=async (req,res) => {
    const userId = req.params.id;

    try{
        const user = await User.findById(userId);
        
        res.render("userDetail", {pageTitle: "User Detail", user});
    }catch(error){
        res.redirect(routes.home);

    }
}

export const getEditProfile =(req, res) => {
    res.render("editProfile", {pageTitle:  "Edit Profile" });
}

export const postEditProfile = async (req, res) => {

    const {
        body: {name, email},
        file
    } = req

    try{

        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    }catch(error){
        console.log(error);
        res.redirect(routes.editProfile);

    }

}
export const getChangePassword=(req, res) => {
    res.render("changePassword", {pageTitle: "changePassword"});
}

export const postChangePassword=async (req, res) => {
    const {
        body: {oldPassword, newPassword, newPassword2}
    }=req

    
        try{

            if(newPassword !==newPassword2){
                res.status(400);
                res.redirect(routes.changePassword);
                return;
            }
            await req.user.changePassword(oldPassword, newPassword);
            res.redirect(routes.me);
            

        }catch(error){
            res.status(400);
            res.redirect(routes.changePassword);
        }
    
    
}
