const mongoose = require("mongoose");

const commentSchema = mongoose.Schema ({
	text  : String,
	author: String
});

// const Comment = 

module.exports = mongoose.model("Comment", commentSchema);