"use strict";
const express 			= require('express'),
	  ejs				= require('ejs'),
	  mongoose			= require('mongoose'),
	  bodyParser		= require('body-parser'),
	  app				= express(),
	  passport			= require('passport'),
	  localStrategy		= require('passport-local'),
	  Campground 		= require('./models/campground'),
	  Comment 			= require('./models/comment'),
	  User				= require('./models/user'),
	  seedDB			= require('./seeds');


app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

seedDB();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp_v6',{ useMongoClient: true });

// ==================!!==================================
//PASSPORT CONFIG  --||
// ==================\/==================================

app.use(require('express-session')({
	secret : "Mrprofessor love kittens.",
	resave : false,
	saveUninitialize : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==================/\==================================
// ==================||==================================



// ==================!!===============!!=================
// RESTful Routes  --||               !!
// ==================\/===============\/=================


app.get('/', function(req, res){
	res.render('campgrounds/landing');
});

// DISPLAY ALL THE CAMPGROUNDS
app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			res.render('campgrounds/index', {campgrounds : allCampgrounds, currentUser : req.user});
		}
	});
});

// DISPLAY FORM TO CREATE A NEW CAMP
app.get('/campgrounds/new', function(req, res){
	res.render('campgrounds/new');
});

// ADD A NEW CAMPGROUND TO DB
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

// SHOWS INFO ABOUT A PARTICULAR CAMPGROUND
app.get('/campgrounds/:id/', function(req, res){
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp)
	{
		if (err) {
			res.send('<h2>Page not found</h2>');
		} else {
			// console.log("foundCamp");
			res.render('campgrounds/show', {campground : foundCamp});
		}
	});
});

// ==================!!===============!!=================
// COMMENTS ROUTE  --||               !!
// ==================\/===============\/=================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// FIND CAMPGROUND BY ID AND RENDER THE CAMP
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.send('<h2>Page not found</h2>');
		} else {
			res.render("comments/new", {campground : campground});
		}
	});
	
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
	// LOOKUP CAMPGROUNDS USING ID
	Campground.findById(req.params.id, function(err,campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// console.log(req.body.comment);
			// CREATE NEW COMMENT
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					// CONNECT NEW COMMENT TO CAMPGROUND
					campground.comments.push(comment);
					campground.save();
					// REDIRECT TO CAMPGROUND SHOWPAGE
					res.redirect('/campgrounds/' + campground._id);
				}
			});	
		}
	});
});	


// ==================!!==================================
// AUTH CONFIG	   --||
// ==================\/==================================

// Show the register form
app.get('/register', function(req, res){
	res.render('register');
});

// Handle register logic
app.post('/register', function(req, res){
	var newUser = new User({username : req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render('register');
		} 

		passport.authenticate('local')(req, res, function(){
			res.redirect('/campgrounds');
		});
	});
});

// Show login form
app.get('/login', function(req, res){
	res.render('login');
});

// Handle Login logic
app.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/campgrounds',
		failuerRedirect: '/login'
	}),function(req, res){

});

// Logout route
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/campgrounds');
});

// ==================/\==================================
// ==================||==================================

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

//Local machine specific
app.listen(3000, function(){
	console.log('Yelpcamp_v6 started....!!')
});


// C9 Specific
// app.listen(process.env.PORT, process.env.IP, function(){
// 	console.log('Yelpcamp V3.0 is running...');
// });

