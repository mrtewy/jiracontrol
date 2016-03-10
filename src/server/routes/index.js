module.exports = function (app) {
  'use strict';

  var fs            = require('fs');
  var path          = require('path');
  var express       = require('express');
  var router        = express.Router();
  var jiraConfig    = require('../config/jira');
  var JiraApi       = require('jira').JiraApi;
  var jira          = new JiraApi(
    jiraConfig.proxy,
    jiraConfig.host,
    jiraConfig.port,
    jiraConfig.username,
    jiraConfig.password,
    jiraConfig.jiraVersion
  );

  // Loop to load all routes files js
  {
    var files = fs.readdirSync("src/server/routes");
    for(var index in files) {
        var file = files[index];
        if (file === "index.js") continue;
        // skip non-javascript files
        if (path.extname(file) != ".js") continue;
        var routes = require("./" + path.basename(file));
        // Add router to handle routing
        routes(router, jira);
    }
  }

  // 404 Handling
  router.get('*', function(req, res){
    res.json({
      callback:[],
      status:'404',
      message:'Page you request are not found',
    });
  });

  // set root index
  app.use('/api', router);

};