var express = require('express');
var app = express();
var mongojs = require ('mongojs');
var db = mongojs('items' , ['items']);
var bodyParser = require("body-parser");

app.use(express.static(__dirname +'/app' )); 
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))
var port = 4000;

app.get('/items', function(req, res){
    console.log("Get Data");
    db.items.find(function (err,docs) {
        console.log(docs);
        res.json(docs);
    })
})
app.post('/items', function(req, res){
    console.log(req.body);
    db.items.insert(req.body, function(err, doc) {
        res.json(doc);
    })
})

app.delete('/items/:id', function(req, res){
    console.log("Delete Part");
    var id = req.params.id;
    console.log(id);
    
    db.items.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
})

app.get('/items/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.items.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    })
  })

app.put('/items/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.items.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {
            url: req.body.url,
            name: req.body.name, 
            color: req.body.color,
            price: req.body.price}},
            new: true}, function(err, doc) {
           res.json(doc);
    })  
}) 

app.listen(port, () => {
    console.log('Listening on ' + port);
});