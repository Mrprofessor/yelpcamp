var express 			= require('express'),
	  ejs				= require('ejs'),
	  mongoose			= require('mongoose'),
	  bodyParser		= require('body-parser'),
	  app				= express(),
	  Campground 		= require('./models/campground'),
	  Comment 			= require('./models/comment'),
	  seedDB			= require('./seeds');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

seedDB();

mongoose.connect('mongodb://localhost/yelp_camp_v4',{ useMongoClient: true });


// RESTful Routes
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
			res.render('campgrounds/index', {campgrounds : allCampgrounds});
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

// ===========================
// COMMENTS ROUTE
// ===========================

app.get("/campgrounds/:id/comments/new", function(req, res){
	// FIND CAMPGROUND BY ID AND RENDER THE CAMP
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground : campground});
		}
	});
	
});

app.post("/campgrounds/:id/comments", function(req,res){
	// LOOKUP CAMPGROUNDS USING ID
	Campground.findById(req.params.id, function(err,campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			console.log(req.body.comment);
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


//Local machine specific
app.listen(3000, function(){
	console.log('Yelpcamp V3.0 is running...');
});


// C9 Specific
// app.listen(process.env.PORT, process.env.IP, function(){
// 	console.log('Yelpcamp V3.0 is running...');
// });

/* 
<!-- <div class="container">
	<div class="row">
			<h2>This is <b><%= camp.name %></b></h2>
			<img src="<%= camp.image %>">
			<p><%= camp.description %></p>
			<a href="/campgrounds" class="btn btn-large btn-primary">Back</a>

			<% camp.comments.forEach(function (component) { %>
				<p>
					<strong><%= component.author %></strong> -
					 <i><%= component.text %></i>	
					</p>
			<%})%>
			<a href="/campgrounds/<%= camp._id %>/comments/new" class="btn btn-success">Comment</a>
	</div>
</div> -->

*/