import passport from "passport";
import GithubStrategy from "passport-github";
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
        const {_json: {id, avatar_url, name, email}}=profile;
        try{
            const user = await User.findOne({email});
            const newUser = await User.create({
                githubId:id,
                avatarUrl:avatar_url,
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
