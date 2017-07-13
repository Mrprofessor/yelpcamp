const express 			= require('express'),
	  ejs				= require('ejs'),
	  mongoose			= require('mongoose'),
	  bodyParser		= require('body-parser'),
	  app				= express();		


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index');
});

app.listen(3000, function(){
	console.log('Yelpcamp V1.0 is running...');
});

  