/*
#############################################################################################
# File:         routes.js
# Description:  routes for the API server
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

/* load the models */
var Project = require('./models/projectModel.js');
var Member = require('./models/memberModel.js');


/* expose the routes to the app with module.exports */
module.exports = function(app, express) {
    
    var apiRouter = express.Router();

    /* api --------------------------------------------------------------------- */
    /* get all projects */
    apiRouter.route('/projects')
    
        .get(function(req, res) {
            Project
            .find()
            .sort({dateAdded:1})
            .exec(function(err, projects) {
                /* if there is an error retrieving, send the error. nothing after res.send(err) will execute */
                if (err)
                    return res.send(err)

                return res.json(projects); /* return all projects in JSON format */
            });
        })
    
    


    /* create project and send back all projects after creation */
    .post(function(req, res) {
        console.log('creating '+req.body.screenshot);

        /* create a project, information comes from AJAX request from Angular */
        Project.create({
            name: req.body.name,
            description: req.body.description,
            projectURL: req.body.projectURL,
            screenshot: req.body.screenshot,
            dateAdded: new Date()
        }, function(err, project) {
            if (err)
                return res.send(err);

            /* get and return all the projects after you create another */
            Project.find(function(err, projects) {
                if (err)
                   return res.send(err)
                
                return res.send('Project created');
            });
        });

    });
    
    /* Retrieve a single project */
    apiRouter.route('/project/:project_id')
        .get(function(req, res) {
            Project.findById(req.params.project_id, function(err, project) {
                if (err)
                    return res.send(err);
                
                /* return single project */
                res.json(project);
            });
        
        });
    
    apiRouter.route('/projects/:project_id')
    /* delete a project */
    .delete(function(req, res) {
        Project.remove({_id : req.params.project_id}, function(err, project) {
            if (err)
                return res.send(err);

            /* get and return all the projects after you create another */
            Project.find(function(err, projects) {
                if (err)
                   return res.send(err);
                
                return res.json(projects);
            });
        });
    })
    
    apiRouter.route('/project/update/:project_id')
    .put(function(req, res) {
       Project.findById(req.params.project_id, function(err, project) {
        if (err)
            return res.send(err);
           
           
			/* update the project info if its different */
			if(req.body.name) project.name = req.body.name;
			if(req.body.description) project.description = req.body.description;
			if(req.body.projectURL) project.projectURL = req.body.projectURL;
            if(req.body.screenshot) project.screenshot = req.body.screenshot;

			/* Save project */
			project.save(function(err){
				if(err) res.send(err);

				/* return message */
				return res.send('Project Updated');
			});
       }); 
    });
    
    /* get all members */
    apiRouter.route('/members')
    .get(function(req, res) {
        Member
        .find()
        .sort({nameLast:1})
        .exec(function(err, members) {
            /* if there is an error retrieving, send the error. nothing after res.send(err) will execute */
            if (err)
                return res.send(err)

            return res.json(members); /* return all members in JSON format */
        });
    })

    /* create member and send back all members after creation */
    .post(function(req, res) {
       
        /* create a member, information comes from AJAX request from Angular */
        Member.create({
            nameFirst   : req.body.nameFirst,
            nameLast    : req.body.nameLast,
            title       : req.body.title,
            screenshot  : req.body.screenshot,
            email       : req.body.email
        }, function(err, member) {
            if (err)
                return res.send(err);

            /* get and return all the members after you create another */
            Member.find(function(err, members) {
                if (err)
                   return res.send(err)
                
                return res.send('Member created');
            });
        });

    });
    
    /* Retrieve a single Member */
    apiRouter.route('/member/:member_id')
        .get(function(req, res) {
            Member.findById(req.params.member_id, function(err, member) {
                if (err)
                    return res.send(err);
                
                /* return single member */
                res.json(member);
            });
        
        });
    
    apiRouter.route('/members/:member_id')
    /* delete a member */
    .delete(function(req, res) {
        Member.remove({_id : req.params.member_id}, function(err, member) {
            if (err)
                return res.send(err);

            /* get and return all the members after you create another */
            Member.find(function(err, members) {
                if (err)
                   return res.send(err);
                
                return res.json(members);
            });
        });
    })
    
    apiRouter.route('/member/update/:member_id')
    .put(function(req, res) {
       Member.findById(req.params.member_id, function(err, member) {
        if (err)
            return res.send(err);
           
           
			/* update the member info if its different */
			if(req.body.nameFirst) member.nameFirst = req.body.nameFirst;
			if(req.body.nameLast) member.nameLast = req.body.nameLast;
			if(req.body.title) member.title = req.body.title;
            if(req.body.screenshot) member.screenshot = req.body.screenshot;
            if(req.body.email) member.email = req.body.email;

			/* Save member */
			member.save(function(err){
				if(err) res.send(err);

				/* return message */
				return res.send('Member Updated');
			});
       }); 
    });
    
    return apiRouter;
};