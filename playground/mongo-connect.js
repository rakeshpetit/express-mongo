const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp")
    .then(client => {
        // console.log('Connected to mongo', client)
        const db = client.db("local");
        // console.log("db", db);
        // db.collection("Todos")
        //     .insertOne({
        //         text: "Third Todo",
        //         connected: false
        //     })
        //     .then(result => {
        //         console.log(JSON.stringify(result, null, 2));
        //     })
        //     .then(() => {
        //         client.close();
        //     })
        //     .catch(e => {
        //         console.log("err", e);
        //     });
       
        db.collection("Todos")
            .find()
            .toArray()
            .then(result => {
                console.log(JSON.stringify(result, null, 2));
            })
            .then(() => {
                client.close();
            })
            .catch(e => {
                console.log("err", e);
            });

    })
    .catch(err => {
        console.log("Error", err);
    });
