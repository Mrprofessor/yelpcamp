# Refactor the routes
	
	* Use express router to reorganize all routes

# Users + Comments
    
    * Associate users and comments.
    * Save author's name to a comment automatically.
    
# Users + Campgrounds
    
    * Prevent an un authenticateduser from creating a campground.
    * Save username+id to newly created campground.
    
# Updating campgrounds
    
    * Add Method-Override
    * Add Edit Route for Campgrounds
    * Add Link to Edit group
    * Add Update Route 
    * Fix $set problem
    * sudo dpkg-reconfigure tzdata

# Destroying campgrounds
    
    * Add Destroy router
    * Add Destroy button
    
# Authorization Campgrounds
    
    * User can only edit or delete his/her campgrounds
    * User can only edit or delete his/her campgrounds
    * Hide/Show edit or delete buttons

# Editing Comments
    
    * Add Edit route for comments
    * Add Edit buttons
    * Add update button
    * route:   /campgrounds/:id/comments/:comment_id/edit

# Deleting Comments
    
    * Add Destroy route
    * Add Delete button

# Authorization Comments
    
    * User can only edit or delete his/her Comments
    * User can only edit or delete his/her Comments
    * Hide/Show edit or delete buttons
    * Refactor middleware    