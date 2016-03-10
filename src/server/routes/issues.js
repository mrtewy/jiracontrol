module.exports = function(router, jira){
	'use strict';

	router.get("/issues/:id", function(req, res){
		var req_id = req.params.id; // get parameter from FORM
		jira.findIssue(req_id, function(error, issue) {
			res.json({
				callback: issue,
			});
		});
	});
};
