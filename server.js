const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./routes/user')
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use("/", require("./routes/main"))
app.use("/registration", require("./routes/registration"))
app.use("/login", require("./routes/login"))
app.use("/about", require("./routes/about"))
app.use("/book", require("./routes/book"))
app.use("/index", require("./routes/index"))
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

app.listen(process.env.PORT || port, () =>
    console.log(`App listening at http://localhost:${port}`)
);