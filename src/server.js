const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models');
const Sequelize = require('sequelize');
const pug = require('pug');
const path = require('path');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add pug template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Add a bit of logging
app.use(morgan('short'))

models.Individus.belongsTo(models.Enclos);
models.Enclos.hasMany(models.Individus, { as: "Individus" });


//Individus

//Avoir les individus et enclos

app.get('/', function (req, res) {
    var m_Individus = [];
    var m_Enclos = [];

    models.Individus.findAll()
        .then((individus) => {
           
            m_Individus = individus;
        })
    models.Enclos.findAll()
        .then((enclos) => {
            
            m_Enclos = enclos;
        })

        .then(() => {
            res.render('index', { individus: m_Individus, enclos: m_Enclos });
        })
        
})

//Creation individus

app.get('/createIndividus', function (req, res) {
    res.render('creer_individu')
})

app.post('/individus', function (req, res) {
    models.Individus.create({
        nom: req.body.nom,
        espece: req.body.espece,
        numero: req.body.numero,
        age: req.body.age,
        poids: req.body.poids,
        taille: req.body.taille 
    })
        .then(() => {
            res.render('individu_cree')
        })
})

//Modification individu

app.get('/modification_individu/:id', function (req, res) {
    res.render('modification_individu', { id: req.params.id })
})

app.post('/individus/update/:id', function (req, res) {

    models.Individus.update({ nom: req.body.nom,  espece: req.body.espece, numero: req.body.numero, age: req.body.age, poids: req.body.poids, taille: req.body.taille }, { where: { id: req.params.id } })
        .then(() => {
            res.render('modification_validee');
        })
})

//Supprimer individu

app.get('/individus/destroy/:id', function (req, res) {
    models.Individus.destroy({ where: { id: req.params.id } })
        .then((individu) => {
            res.render("suppression_individu")
        })
})

//Vue en detail individu

app.get('/individus/:id', function (req, res) {
    models.Individus.findOne({ where: { id: req.params.id } })
        .then((individu) => {
            res.render('vue_detail_individu', { individu: individu });
        })
})


app.get('/lier_individu/:id', function (req, res) {
    var m_Enclos = [];

    
    models.Enclos.findAll()
        .then((enclos) => {

            m_Enclos = enclos;
        })
        .then(() => {
            res.render('lier_individu', { id_singe: req.params.id, enclos: m_Enclos });
        })
    
})

app.get('/lier_individu_enclos/:id_individu/:id_enclos', function (req, res) {
    var m_Enclos;
    var m_Individu;
    models.Individus.findOne({ where: { id: req.params.id_individu } })
        .then((individu) => {
             m_Individu = individu ;
        })
    models.Enclos.findOne({ where: { id: req.params.id_enclos } })
        .then((enclos) => {
            m_Enclos = enclos;
            enclos.addIndividus(m_Individu);
            
        })
        .then(() => {
            
           
            res.render('lier_individu_enclos');
        })
})

//Enclos

//Cree un Enclo
app.get('/createEnclos', function (req, res) {
    res.render('creer_enclo')
})

app.post('/enclos', function (req, res) {
    models.Enclos.create({
        nom: req.body.nom,
        capacite: req.body.capacite
        
    })
        .then(() => {
            res.render('enclos_cree')
        })
})

//Modifier un Enclo
app.get('/modification_enclos/:id', function (req, res) {
    res.render('modification_enclos', { id: req.params.id })
})

app.post('/enclos/update/:id', function (req, res) {

    models.Enclos.update({ nom: req.body.nom, capacite: req.body.capacite }, { where: { id: req.params.id } })
        .then(() => {
            res.render('modification_faite_enclos');
        })
})

//Supprime un Enclo

app.get('/enclos/destroy/:id', function (req, res) {
    models.Enclos.destroy({ where: { id: req.params.id } })
        .then((enclos) => {
            res.render("suppression_enclos")
        })
})

//Vue detail Enclo

app.get('/enclos/:id', function (req, res) {
    models.Enclos.findOne({ where: { id: req.params.id } })
        .then((enclos) => {
            enclos.getIndividus().then(associatedTasks => {
                res.render('vue_detail_enclos', { enclos: enclos, individus: associatedTasks })
            })
        })
})

app.get('/AddEnclos', function (req, res) {
    res.render('creation_enclos')
})



app.get('/LierAEnclos/:id', function (req, res) {
    res.render('lierAEnclos', { id: req.params.id })
})



// Synchronize models (Enlever le force:true pour la version finale !){force:true}
models.sequelize.sync().then(function() {

  app.listen(process.env.PORT, function() {
    console.log('Express server listening');
  });
});
