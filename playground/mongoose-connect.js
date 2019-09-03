const mongoose = require('mongoose')
// import mongoose from 'mongoose'

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

//Find collections
Todo.find().then((doc) => {
    console.log('All todos from db', doc)
})