// const mongoose = require('mongoose')
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function() {
    const { _id, email, tokens } = this.toObject();
    return { _id, email, tokens };
};

UserSchema.methods.generateAuthToken = function() {
    const access = "auth";
    const token = jwt
        .sign({ _id: this._id.toHexString(), access }, "abc123")
        .toString();
    this.tokens.push({ access, token });
    return this.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, "abc123");
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    });
};

const User = mongoose.model("User", UserSchema);

// module.exports = {User}
export default User;
