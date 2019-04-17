import routes from "../routes";

export const getJoin=(req , res) => {
    res.render("Join", {pageTitle:"Join"});
}

export const postJoin=(req, res) => {
    console.log(req.body);
    const joinInfo= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2 : req.body.password2
    }

    if(joinInfo.password!==joinInfo.password2){
        res.status(400);
        res.render("Join", {pageTitle:"Join", joinInfo});
    }
    else{
        res.redirect(routes.home);
    }
    
    
}

export const login=(req , res) => res.render("login");
export const logout=(req , res) => res.render("logout");
export const users=(req,res) => res.render("users");
export const userDetail=(req, res) => res.render("userDetail");
export const editProfile =(req, res) => res.render("editProfile");
export const changePassword=(req, res) => res.render("changePassword");
