var express = require("express");
var app = express();

app.use(express.static("public/imgs"));
app.set("view engine", "ejs");

app.get('/', function(req,res){
	// res.send("This is YELPCAMP");
	res.render("landing");
});

var campgrounds = [{
	name: "Salmon Creek",
	image: "/pic1.jpg"
}, {
	name: "Granite Hill",
	image: "/pic2.jpg"
}, {
	name: "Mountain Goats Rest",
	image: "/pic3.jpg"
}];


app.get('/campgrounds', function(req,res){

	res.render("campgrounds", {campgrounds: campgrounds});
})
app.listen(3000, function(){
	console.log("Example app listening on port 3000");
})