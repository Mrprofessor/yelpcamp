const mongoose = require('mongoose');

const CampgroundsSchema = new mongoose.Schema ({
	name : String,
	image: String,
	description: String
});
const Campground = mongoose.model('Campground', CampgroundsSchema);

module.exports = Campground;