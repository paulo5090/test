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


//Individu

app.get('/individus', function(req, res){
  models.Individus.findAll()
  .then((individus) => {
    res.json(individus)
  })
})

app.post('/individus', function(req, res) {
  models.Individus.create({
    name: req.body.name ,
    picture: req.body.picture,
    espece: req.body.espece,
    datedenaissance: req.body.datedenaissance,
    age: req.body.age,
    enclo: req.body.enclo
  })
  .then((individu)=> {
    res.json(individu);
  })
})

app.get('/individus/:id', function(req, res){
  models.Individus.findOne({
    id: req.params.id
  })
  .then((individu) => {
    res.json(individu)
  })
    .catch((err)=> {
    res.json(err)
  })
})

app.put('/individus/:id', function(req, res){
  models.Individus.update(
    req.body, 
    {
      where: {
      id: req.params.id
    }
  })
  .then((individu) => {
    res.json(individu)
  })
    .catch((err)=> {
    res.json(err)
  })
})

app.delete('/individus/:id', function(req, res) {
models.Individus.destroy({
  where: {
    id: req.params.id
  }
})
  .then((response) => {
    res.json(response);
  })
  .catch((err)=> {
    res.json(err)
  })
})

app.put('/individus', function(req, res) {
  const promises = [];

  req.body.modifications
    .forEach((item)=> {

      promises.push(
        models.Individus.update(
          item.data,
          {
            where: {
              id: item.id
            }
          }))
    })

    Promise.all(promises)
      .then((response)=>{
        res.json(response);
      })
      .catch((err)=>{
        res.json(err)
      })
})

app.delete('/individus', function(req, res) {
models.Individus.destroy({
  where: {
    id: req.params.ids
  }
})
  .then((response) => {
    res.json(response);
  })
  .catch((err)=> {
    res.json(err)
  })
})

// Synchronize models (Enlever le force:true pour la version finale !){force:true}
models.sequelize.sync().then(function() {

  app.listen(3000, function() {
    console.log('Express server listening');
  });
});
