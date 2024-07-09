const express = require('express')
const { MongoClient, Collection } = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()


// Connection URL
// const url = 'mongodb://localhost:27017';
const url = process.env.MONGO_URI
const client = new MongoClient(url);

// Database Name
const dbName = 'Todoapp';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())


client.connect();

//get all the TOdo
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save all the todos
app.post('/', async(req, res) => {
    const todo = req.body
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const findResult = await collection.insertOne(todo);
    // agar ye nahi likhega to postman me response nahi aayega aur tu samjega ki postman kharab he but tu c he 
    res.send({success : true , resulte : findResult})
})

// delete todos
app.delete('/', async(req, res) => {
    const todo = req.body
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const findResult = await collection.deleteOne(todo);
    // agar ye nahi likhega to postman me response nahi aayega 
    //aur tu samjega ki postman kharab he but tu c he 
    res.send({success : true , resulte : findResult})
})

app.listen(port, () => {
   
    console.log(`Example app listening on port http://localhost:${port}`)
})
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working