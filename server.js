import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Pusher from 'pusher'

import dbModel from './dbModel.js';

// App Config
const app = express()
const port = process.env.PORT || 8080

// Middlewares
app.use(express.json())
app.use(cors())

// DB Config
const connection_url = "mongodb+srv://admin:jW1LoBJgPLrJOnu7@cluster0.jk8uv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('DB Connected')
})

// API Routes
app.get('/', (req,res) => res.status(200).send('hello world'))

app.post('/upload', (req,res) => {
    const body = req.body;

    dbModel.create(body, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost:${port}`))