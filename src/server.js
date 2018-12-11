const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

//repond "hello world" si une requete GET est envoyee
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

//Individu

app.get('/individu', function(req, res){
  models.Individu.findAll()
  .then((individu) => {
    res.json(individu)
  })
})

app.post('/individu', function(req, res) {
  models.Individu.create({
    nom:req.body.nom,
    image:req.body.image,
    espece:req.body.espece,
    datedenaissance:req.body.datedenaissance,
    age:req.body.age,
    enclo:req.body.enclo
  })
  .then((individu)=> {
    res.json(individu);
  })
})

// Synchronize models
models.sequelize.sync().then(function() {

  app.listen(process.env.PORT, function() {
    console.log('Express server listening');
  });
});
