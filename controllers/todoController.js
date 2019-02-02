var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://testtest1:testtest1@ds119765.mlab.com:19765/todo-app-database');

//create schema
var todoSchema= new mongoose.Schema({
  item: String
});

//make model
var Todo= mongoose.model('Todo', todoSchema);
//make an item
/**
var itemone= Todo({item: 'do android'}).save(function(err){
  if(err) throw err;
  console.log('item saved!');
});

var data = [{item : 'sleep'}, {item: 'eat'}, {item: 'bath'}, {item: 'nap'}, {item:'repeat'}];
**/
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from mongo db and pass to view
    //find all items
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });

  });

  app.post('/todo', urlencodedParser,function(req,res){
    //get data from view and add it to mongo db
    var newTodo= Todo(req.body).save( function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req,res){
    //delete requested item from mongo db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove( function(err, data){
      if(err) throw err;
      res.json(data);
    })

  });

};
