const mongoose = require('mongoose');


const CampgroundsSchema = new mongoose.Schema ({
	name : String,
	image: String,
	description: String,
	comments  : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Comment"
		}
	]
});
const Campground = mongoose.model('Campground', CampgroundsSchema);

module.exports = Campground;