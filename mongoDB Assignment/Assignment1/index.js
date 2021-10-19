const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const dataModel = require('./model/model');

const MongoClient = mongo.MongoClient;

const uri = "mongodb+srv://coolhack069:XzC6N7dOyUeQl8M9@cluster0.kz6v9.mongodb.net/assignment?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use(bodyParser.json());

const port = 3001;

app.get('/api/get', (req, res) => {
    client.connect(err => {
        if(err) {
            throw err;
        }
        const collection = client.db('assignment').collection('data');
        const fetchedData = {};
        collection.find(fetchedData).toArray(function(err, result) {
            res.send(result);
            client.close();
        });
    })
});

app.get('/api/getStudentDetails', (req, res) => {                     //The API I have written to query through the Database
    const input = req.params.name;
    client.connect(err => {
        if(err) {   
            throw err;
        }
        const collection = client.db('assignment').collection('data');
        // const fetchedData = new dataModel({
        //     name : req.params.name
        // });
        const query = {
            name : new RegExp('^' + input, 'i'), // i - case insensitive, => /^S/i
        };
        collection.find(query).toArray(function(err, result) {
            res.send(result);
            client.close();
        })
    })
});

app.post('/api/add', (req, res) => {            //To add Data
    const name = req.body.name;
    const collegeName = req.body.collegeName;
    const location = req.body.location;

    client.connect(err => {
        if(err) {
            throw err;
        }
        
            const collection = client.db('assignment').collection('data');
            const storeData = new dataModel({
                name : name,
                collegeName : collegeName,
                location : location
            });
            console.log(storeData);
            collection.insertOne(storeData, function(err, result) {
                res.json({
                    result : "Success"
                });
                console.log(err);
                client.close();
            });
        })
    });

    app.listen(port, () => {
        console.log(`Application running at http://localhost:${port}`)
    })

