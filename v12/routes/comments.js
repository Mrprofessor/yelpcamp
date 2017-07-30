const express       = require("express"),
      router        = express.Router({mergeParams : true}),
      Campground    = require("../models/campground"),
      Comment       = require("../models/comment"),
      middleware	= require("../middleware/index.js");;

router.get("/new", middleware.isLoggedIn, function(req, res){
	// FIND CAMPGROUND BY ID AND RENDER THE CAMP
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.send('<h2>Page not found</h2>');
		} else {
			res.render("comments/new", {campground : campground});
		}
	});
	
});

router.post("/", middleware.isLoggedIn, function(req,res){
	// LOOKUP CAMPGROUNDS USING ID
	Campground.findById(req.params.id, function(err,campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// CREATE NEW COMMENT
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					req.flash("error", "Something went wrong.");
					console.log(err);
				} else {
					comment.author.id		= req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					// CONNECT NEW COMMENT TO CAMPGROUND
					campground.comments.push(comment);
					campground.save();
					// REDIRECT TO CAMPGROUND SHOWPAGE
					req.flash("success", "Successfully added comments.");
					res.redirect('/campgrounds/' + campground._id);
				}
			});	
		}
	});
});

// EDIT COMMENT
router.get('/:comment_id/edit',middleware.checkCommentsOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment) {
	    if (err) {
	    	console.log(err);
	    } else {
	    	res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
	    }
	});
});

// UPDATE COMMENT
router.put('/:comment_id/',middleware.checkCommentsOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "comment updated.");
			res.redirect("/campgrounds/"+ req.params.id);
		}	
	});
});

// DELETE COMMENT
router.delete('/:comment_id/',middleware.checkCommentsOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			res.redirect('back');
		} else {
			req.flash("success", "Successfully deleted comment.");
			res.redirect("/campgrounds/"+ req.params.id);
		}	
	});	
});




module.exports = router;