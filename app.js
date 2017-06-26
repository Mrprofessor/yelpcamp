var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundsSchema = new mongoose.Schema ({
		name: String,
		image: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "imgs/camp2.jpg",
// 		description: "This is a huge granite hill, No bathrooms, No water, Beautiful granite."
// }, function(err, campground){
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND.");
// 		console.log(campground);
// 	}
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("public/css"));
app.set("view engine", "ejs");

app.get('/', function(req,res){
	// res.send("This is YELPCAMP");
	res.render("landing");
});


app.get('/campgrounds', function(req,res){
//Get all campgrounds from the db
	Campground.find({}, function (err, allCampgrounds) {
		// body...
		if(err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds})
		}
	});

})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
	//Find the campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});	
});



app.post("/campgrounds",function(req, res){
	//res.send("You hit the post route.")
	//get data and add to campground array
	//redirect back to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	console.log(image);
	var newCampground = {name: name, image: image, description: desc};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});









// app.listen(3000, function(){
// 	console.log("Example app listening on port 3000");
// });

//C9.io
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});