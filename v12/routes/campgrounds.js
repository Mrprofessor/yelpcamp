const express       = require("express"),
      router        = express.Router(),
      Campground    = require("../models/campground"),
      middleware	= require("../middleware/index.js");
      
      
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
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('campgrounds/new');
});

// ADD A NEW CAMPGROUND TO DB
router.post('/', middleware.isLoggedIn, function(req, res){

	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {
		name : req.body.name,
		image: req.body.image,
		price: req.body.price,
		description : req.body.description,
		author: author
	};
	
	Campground.create(newCampground, function(err, newCreated){
		if (err) {
			console.log(err);
			res.redirect('/campgrounds/new');
		} else {
			req.flash("success", "Campground created.");
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

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit',middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function (err, foundCampground) {
		
		res.render('campgrounds/edit', {campground : foundCampground});
		
	});
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id',middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
	if (err) {
		res.redirect('/campgrounds');
		console.log('err');
	} else {
		req.flash("success", "Campground updated.");
		res.redirect('/campgrounds/' + req.params.id);
		// console.log(updatedCampground);
	}	
	});
});

// DELETING CAMPGROUNDS
router.delete('/:id',middleware.checkCampgroundOwnership, function(req, res) {

	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			req.flash("error", "Something went terribly wrong.");
			console.log(err);
		} else {
			req.flash("success", "Successfully deleted campground.");
			res.redirect('/campgrounds');
		}	
	}); 
});





module.exports = router;