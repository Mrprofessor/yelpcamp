var express = require("express");
var app = express();

var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', function(req,res){
	// res.send("This is YELPCAMP");
	res.render("landing");
});

var campgrounds = [{
	name: "Salmon Creek",
	image: "imgs/pic1.jpg"
}, {
	name: "Granite Hill",
	image: "imgs/pic2.jpg"
}, {
	name: "Mountain Goats Rest",
	image: "imgs/pic3.jpg"
}, {
	name: "Salmon Creek",
	image: "imgs/pic1.jpg"
}, {
	name: "Granite Hill",
	image: "imgs/pic2.jpg"
}, {
	name: "Mountain Goats Rest",
	image: "imgs/pic3.jpg"
}, {
	name: "Salmon Creek",
	image: "imgs/pic1.jpg"
}, {
	name: "Granite Hill",
	image: "imgs/pic2.jpg"
}, {
	name: "Mountain Goats Rest",
	image: "imgs/pic3.jpg"
}];


app.get('/campgrounds', function(req,res){

	res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.post("/campgrounds",function(req, res){
	//res.send("You hit the post route.")
	//get data and add to campground array
	//redirect back to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	console.log(image);
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});
app.listen(3000, function(){
	console.log("Example app listening on port 3000");
})