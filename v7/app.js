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

// Requiring routes
const commentRoutes 	= require("./routes/comments"),
	  campgroundRoutes	= require("./routes/campgrounds"),
	  indexRoutes		= require("./routes/index");
	
	
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
mongoose.connect('mongodb://localhost/yelp_camp_v7',{ useMongoClient: true });

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

app.use('/', indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);


// C9 Specific
app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Yelpcamp V3.0 is running...');
});

//Local machine specific
// app.listen(3000, function(){
// 	console.log('Yelpcamp_v6 started....!!')
// });
