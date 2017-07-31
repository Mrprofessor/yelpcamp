const express       = require("express"),
      router        = express.Router(),
      Campground    = require("../models/campground");
      
      
// DISPLAY ALL THE CAMPGROUNDS
router.get('/', function(req, res){
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
router.get('/new', function(req, res){
	res.render('campgrounds/new');
});

// ADD A NEW CAMPGROUND TO DB
router.post('/', function(req, res){

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
router.get('/:id/', function(req, res){
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

module.exports = router;