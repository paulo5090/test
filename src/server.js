const express = require('express')
const bodyParser = require('body-parser');
//rajout
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require('morgan');
const app = express()
const models = require('./models/index');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect(process.env.MYSQL_ADDON_DB);

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
//app.use(morgan('short'))

app.use("/", (req, res) => {
 res.sendFile(__dirname + "/index.pug");
});

// Get all the users defined
app.get('/', function (req, res) {
  models.User.findAll()
    .then((users) => {
      res.json(users)
    })
})

//Creation d'un singe et insertion de ce dernier dans la base de donnee

var nameSchema = new mongoose.Schema({
 firstName: String,
 lastNameName: String
});

var User = mongoose.model("User", nameSchema);

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
      myData.save().then(item => {
 res.send("item saved to database");
 })
    .catch(err => {
    res.status(400).send("unable to save to database");
 });
});

//repond "hello world" si une requete GET est envoyee a la page
app.get('/', function(req, res) {
     res.send('hello world');
});

// Add a new user to the database et repond a une requete post par "User added"
app.post('/', function(req, res) {
  models.User.create({
    username: req.body.username
  })
    .then(() => {
      res.send('User added !')
    })
})

// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */

  app.listen(process.env.PORT, function() {
    console.log('Express server listening');
  });
});
