const mongoose = require('mongoose')
// const User = require('../models/user')
// import mongoose from 'mongoose'
import User from '../models/user'

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/TodoApp')

const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
})

//Add collections
// const newTodo = new Todo({
//     text: 'Eat lunch'
// })

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }).catch((err) => {
//     console.log('Error', err)
// })

// Delete collections
// Todo.deleteOne({ _id: '5d6e79a360abfe1efd777c9b' }).then((doc) => {
//     console.log('Post delete todos from db', doc)
// })

// Todo.findOneAndRemove({ _id: '5d6e6c45635acf1c7bec256a' }).then((doc) => {
//     console.log('Post delete todos from db', doc)
// })

// Todo.findByIdAndRemove('5d6e79e62484821f097ebeea').then((doc) => {
//     console.log('Post delete todos from db', doc)
// })

// Todo.findByIdAndRemove('5d6e79e62484821f097ebeea').then((doc) => {
//     console.log('Post delete todos from db', doc)
// })

//Find collections
// Todo.find().then((doc) => {
//     console.log('All todos from db', doc)
// })


// User.findOneAndRemove({email: 'rakesh2@example.com'}).then((doc) => {
//     console.log('Post delete users from db', doc)
// })

//Find users
User.find().then((user) => {
    console.log('All users from db', JSON.stringify(user))
})