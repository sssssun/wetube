import passport from "passport";
import GithubStrategy from "passport-github";
import GoogleStrategy from "passport-google-oauth2";
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

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        //console.log(accessToken, refreshToken, profile, cb);
        const {_json : {sub, name, email, picture}}=profile;

        try{
            const user=await User.findOne({email});
            const newUser = await User.create({
                googleId:sub,
                avatarUrl: picture,
                name,
                email
            });

            if(user){
                user.googleId=sub;
                user.save();
                return cb(null,user);
            }else{
                return cb(null, newUser);
            }
        }catch(error){
            console.log(error);
        }
      }
));


