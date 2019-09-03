// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

// module.exports = {User}
export default User