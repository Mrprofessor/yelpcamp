var express 			= require('express'),
	  ejs				= require('ejs'),
	  mongoose			= require('mongoose'),
	  bodyParser		= require('body-parser'),
	  app				= express(),
	  Campground 		= require('./models/campground'),
	  seedDB			= require('./seeds');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

seedDB();

mongoose.connect('mongodb://localhost/yelp_camp_v4',{ useMongoClient: true });


// RESTful Routes
app.get('/', function(req, res){
	res.render('landing');
});

app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			res.render('index', {campgrounds : allCampgrounds});
		}
	});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.post('/campgrounds', function(req, res){

	var newCampground = {
		name : req.body.name,
		image: req.body.image,
		description : req.body.description
	};

	Campground.create(newCampground, function(err, newCreated){
		if (err) {
			console.log(err);
			res.redirect('/campgrounds/new');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/:id/', function(req, res){
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp)
	{
		if (err) {
			res.send('<h2>Page not found</h2>');
		} else {
			console.log("foundCamp");
			res.render('show', {camp : foundCamp});
		}
	});
});


//Local machine specific
app.listen(3000, function(){
	console.log('Yelpcamp V3.0 is running...');
});


// C9 Specific
// app.listen(process.env.PORT, process.env.IP, function(){
// 	console.log('Yelpcamp V3.0 is running...');
// });