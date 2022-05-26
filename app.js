const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRoute = require('./routes/user')
app.use('/user', userRoute)

const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
   useNewUrlParser: true
}).then(() => {
    console.log("db connected successfully!");
}).catch(err => {
    console.log("couldn't connect to db", err)
    process.exit();
});

app.get('/', (req, res) =>{
    res.json({"message": "Hello Crud Node Express"})
})
app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
});