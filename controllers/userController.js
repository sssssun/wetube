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

export const logout=(req , res) => {
    //To do : Process Logout
    res.redirect(routes.home);
}
export const users=(req,res) => res.render("users");
export const userDetail=(req, res) => {
    res.render("userDetail");
}
export const editProfile =(req, res) => res.render("editProfile");
export const changePassword=(req, res) => res.render("changePassword");
