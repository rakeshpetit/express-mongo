// const express = require('express')
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from './db/mongoose'
import Todo from './models/todo'
import User from './models/user'

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    });
})

app.listen(3000, () => {
    console.log('Server on port 3000')
})

//Start with below command as we have babel to transpile es6 to es5
//./node_modules/.bin/babel-node server.js