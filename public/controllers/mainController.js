/*
#############################################################################################
# File:         mainController.js
# Description:  Main controller for the app
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

angular.module('mainCtrl', [])

    // inject the Project service factory into our controller
    .controller('mainController', function($scope, $http, Projects, Members) {
        $scope.formData = {};
    
        // GET =====================================================================
        // when landing on the page, get all projects and show them
        // use the service to get all the projects
        Projects.all()
            .success(function(data) {
                $scope.processProjectsData(data);
            });
    
        Members.all()
            .success(function(data) {
                $scope.processTeamData(data); 
        });

    
        /* Creates the projects */
        $scope.processProjectsData = function(data){
            for(var i=0; i<data.length; i++){
                var box = new projectBox({
                    name:data[i].name,
                    projectURL:data[i].projectURL,
                    description:data[i].description,
                    screenshotURL:data[i].screenshot,
                    dateAdded:data[i].dateAdded
                });

            }
        }

        /* Create the team members */
        $scope.processTeamData = function(data){
            for(var i=0; i<data.length; i++){
                var box = new teamBox({
                    nameFirst:data[i].nameFirst,
                    nameLast:data[i].nameLast,
                    title:data[i].title,
                    screenshotURL:data[i].screenshot,
                    email:data[i].email
                });
            }

        }
    });