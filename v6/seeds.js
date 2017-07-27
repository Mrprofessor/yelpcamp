var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require('./models/comment');


var data = [
	{
		name : "Clouds rest",
		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/July/camp-cover2-large.jpg",
		description: "Cat ipsum dolor sit amet, present belly, scratch hand when stroked. Run outside as soon as door open. Hide from vacuum cleaner scratch the box poop in litter box, scratch the walls shove bum in owner's face like camera lens or poop on grasses. Drink water out of the faucet meow all night meowwww plop down in the middle where everybody walks eat and than sleep on your face. I cry and cry and cry unless you pet me, and then maybe i cry just for fun. Spend all night ensuring people don't sleep sleep all day who's the baby plop down in the middle where everybody walks. Inspect anything brought into the house. Meow friends are not food. Mark territory give attitude, yet poop in litter box, scratch the walls scratch the box kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff run outside as soon as door open. Thug cat chase ball of string. Sleep nap meow but love to play with owner's hair tie cat slap dog in face or lick sellotape, stare at the wall, play with food and get confused by dust. Run outside as soon as door open purrrrrr climb leg, or cat slap dog in face paw at your fat belly i could pee on this if i had the energy for cough hairball on conveniently placed pants. A nice warm laptop for me to sit on stand in front of the computer screen hiss at vacuum cleaner and lie in the sink all day love to play with owner's hair tie so ask to go outside and ask to come inside and ask to go outside and ask to come inside for burrow under covers. Destroy the blinds. Fooled again thinking the dog likes me spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce destroy couch as revenge and plan steps for world domination eat a plant, kill a hand for love to play with owner's hair tie meow. "
	},
	{
		name: "Hillfort Tipis",
		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/July/camp-cwtch-large.jpg",
		description: "Cat ipsum dolor sit amet, present belly, scratch hand when stroked. Run outside as soon as door open. Hide from vacuum cleaner scratch the box poop in litter box, scratch the walls shove bum in owner's face like camera lens or poop on grasses. Drink water out of the faucet meow all night meowwww plop down in the middle where everybody walks eat and than sleep on your face. I cry and cry and cry unless you pet me, and then maybe i cry just for fun. Spend all night ensuring people don't sleep sleep all day who's the baby plop down in the middle where everybody walks. Inspect anything brought into the house. Meow friends are not food. Mark territory give attitude, yet poop in litter box, scratch the walls scratch the box kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff run outside as soon as door open. Thug cat chase ball of string. Sleep nap meow but love to play with owner's hair tie cat slap dog in face or lick sellotape, stare at the wall, play with food and get confused by dust. Run outside as soon as door open purrrrrr climb leg, or cat slap dog in face paw at your fat belly i could pee on this if i had the energy for cough hairball on conveniently placed pants. A nice warm laptop for me to sit on stand in front of the computer screen hiss at vacuum cleaner and lie in the sink all day love to play with owner's hair tie so ask to go outside and ask to come inside and ask to go outside and ask to come inside for burrow under covers. Destroy the blinds. Fooled again thinking the dog likes me spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce destroy couch as revenge and plan steps for world domination eat a plant, kill a hand for love to play with owner's hair tie meow. "
	},
	{
		name: "Koa Tree Camp",
		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/may/glamping-hemscott-PR-TRAVEL-large.jpg",
		description: "Cat ipsum dolor sit amet, present belly, scratch hand when stroked. Run outside as soon as door open. Hide from vacuum cleaner scratch the box poop in litter box, scratch the walls shove bum in owner's face like camera lens or poop on grasses. Drink water out of the faucet meow all night meowwww plop down in the middle where everybody walks eat and than sleep on your face. I cry and cry and cry unless you pet me, and then maybe i cry just for fun. Spend all night ensuring people don't sleep sleep all day who's the baby plop down in the middle where everybody walks. Inspect anything brought into the house. Meow friends are not food. Mark territory give attitude, yet poop in litter box, scratch the walls scratch the box kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff run outside as soon as door open. Thug cat chase ball of string. Sleep nap meow but love to play with owner's hair tie cat slap dog in face or lick sellotape, stare at the wall, play with food and get confused by dust. Run outside as soon as door open purrrrrr climb leg, or cat slap dog in face paw at your fat belly i could pee on this if i had the energy for cough hairball on conveniently placed pants. A nice warm laptop for me to sit on stand in front of the computer screen hiss at vacuum cleaner and lie in the sink all day love to play with owner's hair tie so ask to go outside and ask to come inside and ask to go outside and ask to come inside for burrow under covers. Destroy the blinds. Fooled again thinking the dog likes me spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce destroy couch as revenge and plan steps for world domination eat a plant, kill a hand for love to play with owner's hair tie meow.  "
	}
]
function seedDB() {
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("All data removed");
		//Add a few campgrounds
		data.forEach(function (seed) {
			Campground.create(seed, function (err, campground) {
				if (err) {
					console.log(err);
				} else {
					console.log("A camp added");
					//Add a few comments
					Comment.create(
						{
							text: "This place is grweat but I wish there was internet.",
							author: "Homer"
						}, function (err, comment) {
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comments");	
							}
							
						});
				}
			});
		});
	});
}

module.exports = seedDB;