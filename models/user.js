// const mongoose = require('mongoose')
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

UserSchema.statics.findByCredentials = function(email, password) {
    return User.findOne({
        email
    })
        .then(user => {
            if (!user) {
                return Promise.reject(404);
            } else {
                return bcrypt
                    .compare(password, user.password)
                    .then(res => {
                        if (res) return Promise.resolve(user);
                        else return Promise.reject(401);
                    })
                    .catch(() => {
                        return Promise.reject(401);
                    });
            }
        })
        .then(user => {
            return user;
        });
};

UserSchema.pre("save", function(next) {
    if (this.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model("User", UserSchema);

// module.exports = {User}
export default User;
