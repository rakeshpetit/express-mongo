const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) console.log("Error", err);
    console.log("Connected to mongo", client);
    const db = client.db("local");
    db.collection("Todos").insertOne(
        {
            text: "First Todo",
            connected: false
        },
        (err, result) => {
            if (err) console.log("Unable to insert", err);
            console.log(JSON.stringify(result, null, 2));
        }
    );
});
