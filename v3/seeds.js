const mongoose = require("mongoose");
const Campground = require("./models/campground");


let data = [
	{
		name : "Clouds rest",
		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/July/camp-cover2-large.jpg",
		description: "Blah blahdasd as ffs sedgdfdf hnnnn sdrrsdgh rgeruigub rgruurudfuu "
	},
	{
		name: "Hillfort Tipis",
		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/July/camp-cwtch-large.jpg",
		description: "g stalwarts are attracted by the quirky, fun, family-friendly appeal, and bags more space and fresh air than y"
	},
	{
		name: "Koa Tree Camp",
		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/may/glamping-hemscott-PR-TRAVEL-large.jpg",
		description: "t while a decade ago a dusty tipi with a soggy foamonsidered enough glamp for your buck, nowadays, that just won’t "
	}
]
function seedDB() {
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("All data removed");
	});

	//Add a few campgrounds
	Campground.create()

	//Remove a few comments
}

module.exports = seedDB;