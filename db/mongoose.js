// const mongoose = require('mongoose') 
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/TodoApp')

// module.exports = { mongoose }
export default mongoose