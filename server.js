// const express = require('express')
import express from "express";
import bodyParser from "body-parser";
import { ObjectID } from "mongodb";
import mongoose from "./db/mongoose";
import Todo from "./models/todo";
import User from "./models/user";
import { authenticate, login } from "./middleware/authenticate";

const app = express();

app.use(bodyParser.json());

app.post("/todos", authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        createdBy: req.user._id
    });
    todo.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get("/todos", authenticate, (req, res) => {
    Todo.find({
        createdBy: req.user._id
    })
        .then(todos => {
            res.send({ todos });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get("/todos/:id", authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({ _id: id, createdBy: req.user._id })
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.delete("/todos/:id", authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({ _id: id, createdBy: req.user._id })
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.patch("/todos/:id", authenticate, (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    let { completed } = req.body;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let completedAt = null;
    if (completed) {
        completedAt = new Date().getTime();
    } else {
        completed = false;
    }
    Todo.findOneAndUpdate(
        { _id: id, createdBy: req.user._id },
        { $set: { text, completed, completedAt } },
        { new: true }
    )
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.post("/users", (req, res) => {
    const { email, password } = req.body;
    const user = new User({
        email,
        password
    });
    user.save()
        .then(user => {
            return user.generateAuthToken();
        })
        .then(token => {
            res.header("x-auth", token).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
});

app.post("/users/login", login, (req, res) => {
    res.send(req.user);
});

app.delete("/users/logout", authenticate, (req, res) => {
    req.user
        .removeToken(req.token)
        .then(() => {
            res.status(200).send();
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.listen(3000, () => {
    console.log("Server on port 3000");
});

//Start with below command as we have babel to transpile es6 to es5
//./node_modules/.bin/babel-node server.js
