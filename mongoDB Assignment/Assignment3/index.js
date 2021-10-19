const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongo = require('mongodb');
const model = require('./model/model');


const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://coolhack069:XzC6N7dOyUeQl8M9@cluster0.kz6v9.mongodb.net/assignment_3?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(bodyParser.json());

const port = 3004;

app.post('/product/add', (req, res) => {
    const enter_name = req.body.productName;
    const enter_price = req.body.price;
    client.connect(err => {
        if(err) {
            throw err;
        }
        const collection = client.db('assignment_3').collection('data');
        const addQuery = new model({
            productName : enter_name,
            price : enter_price
        });
        collection.insertOne(addQuery, function(err, result) {
            res.json({
                "result" : "success"
            });
            client.close();
        });
    });
});

app.get('/product/getAll', (req, res) => {
    client.connect(err => {
        if(err) {
            throw err;
        }
        const collection = client.db('assignment_3').collection('data');
        const fetchData = {};
        collection.find(fetchData).toArray(function(err, result) {
            res.send(result);
            client.close();
        })
    })
});

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`);
});
