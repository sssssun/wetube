import mongoose from "mongoose";
//passport-local-mongoose : passport.js에서 code simplify
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    githubId : Number,
    facebookId : Number
    

});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

const model = mongoose.model("User",UserSchema);
export default model;
