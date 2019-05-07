import passport from "passport";
import GithubStrategy from "passport-github";
import InstagramStrategy from "passport-instagram";
import User from "./models/User";



passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GithubStrategy({
    clientID:process.env.GH_ID,
    clientSecret:process.env.GH_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
}, 
    //github에서 돌아왔을 때 실행되는 함수
    async (accessToken, refreshToken, profile, cb) => {
        const {_json: {id, avatar_url: avatarUrl, name, email}}=profile;
        try{
            const user = await User.findOne({email});
            const newUser = await User.create({
                githubId:id,
                avatarUrl,
                name,
                email
            });

            if(user){
                user.githubId=id;
                user.save();
                return cb(null, user);
            }else{
                return cb(null,newUser);
            }
        }catch(error){
            console.log(error);
        }
    }));


passport.use(new InstagramStrategy(
    {
        clientID: process.env.INSTA_ID,
        clientSecret: process.env.INSTA_SECRET,
        callbackURL: "http://localhost:4000/auth/instagram/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        
        console.log(accessToken, refreshToken, profile, cb);
        const { _json: {id, full_name: name, profile_picture: avatarUrl}}= profile;

        try{
            const user = await User.findOne({id});
            const newUser = await User.create({
                instagramId: id,
                name,
                avatarUrl
            })

            if(user){
                user.instagramId=id;
                user.save();
                return cb(null,user);
            }else{
                return cb(null,newUser);
            }

        }catch(error){
            console.log(error);
        }
        
    }
    

));
