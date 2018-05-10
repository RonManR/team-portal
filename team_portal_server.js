/*
#############################################################################################
# File:         team_portal_server.js
# Description:  Sets up the node server
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

    // set up ========================
    var config = require('./config');                /* Load the configuration file */
    var express  = require('express');
    var app      = express();                        // create our app w/ express
    var mongoose = require('mongoose');              // mongoose for mongodb
    var morgan   = require('morgan');                // log requests to the console (express4)
    var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
    var path = require('path');
    var http = require('http');
    var multer  = require('multer');

   

    // configuration ===============================================================
   mongoose.connect(config.database);     // connect to mongoDB database 

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

    /* Upload */
    var storage = multer.diskStorage({
      destination: './public/assets/images/uploads/',
      filename: function (req, file, cb) {
        cb(null, file.originalname.replace(path.extname(file.originalname), "") + path.extname(file.originalname))
      }
    })

    var upload = multer({ storage: storage });

    app.post('/savedata', upload.single('file'), function(req,res,next){
        console.log('Upload Successful ', req.file, req.body);
    });

    // routes ======================================================================
    /* API routes */
    var apiRoutes = require('./server/routes.js')(app, express);
    app.use('/api', apiRoutes);

    /* Catchall Route */
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname + '/public/views/index.html'));
    });

    // listen (start app with node server.js) ======================================
    app.listen(config.port);
    console.log("Getting MEAN on port : " + config.port);