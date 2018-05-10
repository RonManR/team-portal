/*
#############################################################################################
# File:         adminController.js
# Description:  controller for admin functions
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

angular.module('adminCtrl', [])

    
    .controller('adminController', function($scope, $http, Projects, fileUpload) {
     $scope.formData = {};
     $scope.editMode = 'new';

            // GET =====================================================================
            // when landing on the page, get all projects and show them
            // use the service to get all the projects
            Projects.all()
                .success(function(data) {
                    $scope.projects = data;
                });

            // CREATE ==================================================================
            // when submitting the add form, send the text to the node API
            $scope.createProject = function() {

                // validate the formData to make sure that something is there
                // if form is empty, nothing will happen
                // people can't just hold enter to keep adding the same project
                if (!$.isEmptyObject($scope.formData)) {
                    
                   

                    // call the create function from our service (returns a promise object)
                    Projects.create($scope.formData)

                        // if successful creation, call our get function to get all the new projects
                        .success(function(data) {
                            $scope.formData = {}; // clear the form so our user is ready to enter another
                            $scope.message = data;
                        });
                }
            };
        
            /* Upload image */
            $scope.uploadFile = function(){
                $scope.formData.screenshot = 'uploads/'+event.target.files[0].name;

                var file = $scope.myFile;
                var uploadUrl = "/savedata";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            }
            
    
            // DELETE ==================================================================
            // delete a project after checking it
            $scope.deleteProject = function(id) {
                Projects.delete(id)
                    // if successful creation, call our get function to get all the new projects
                    .success(function(data) {
                        $scope.projects = data; // assign our new list of projects
                    });
            };

    })

    .controller('projectUpdateController', function($scope, $routeParams, Projects, fileUpload){
    $scope.editMode = 'update';
    
        Projects.get($routeParams.project_id)
            .success(function(data){
                $scope.formData = data;
        });
            /* Upload image */
            $scope.uploadFile = function(){
                $scope.formData.screenshot = 'uploads/'+event.target.files[0].name;

                var file = $scope.myFile;
                var uploadUrl = "/savedata";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            }
            
    
            // UPDATE ==================================================================
            $scope.updateProject = function(id) {
                console.log('update project');
                /* Get project data for the user to update */
                Projects.update($routeParams.project_id, $scope.formData)
                    .success(function(data){
                        $scope.formData = {}; // clear the form 
                        $scope.message = data;
                });
                
            };

            // DELETE ==================================================================
            // delete a project after checking it
            $scope.deleteProject = function(id) {
                Projects.delete(id)
                    // if successful creation, call our get function to get all the new projects
                    .success(function(data) {
                        $scope.projects = data; // assign our new list of projects
                    });
            };

    });