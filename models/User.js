import mongoose from "mongoose";
//passport-local-mongoose : passport.js에서 code simplify
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    githubId : Number,
    googleId : Number,
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    videos : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
    

});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

const model = mongoose.model("User",UserSchema);
export default model;
