/*
#############################################################################################
# File:         memberController.js
# Description:  controller for admin team member functions
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

angular.module('memberCtrl', [])

    
    .controller('memberController', function($scope, $http, Members, fileUpload) {
     $scope.formData = {};
     $scope.editMode = 'new';

            // GET =====================================================================
            // when landing on the page, get all members and show them
            // use the service to get all the members
            Members.all()
                .success(function(data) {
                    $scope.members = data;
                });

            // CREATE ==================================================================
            // when submitting the add form, send the text to the node API
            $scope.createMember = function() {

                // validate the formData to make sure that something is there
                // if form is empty, nothing will happen
                // people can't just hold enter to keep adding the same member
                if (!$.isEmptyObject($scope.formData)) {
                    
                   

                    // call the create function from our service (returns a promise object)
                    Members.create($scope.formData)

                        // if successful creation, call our get function to get all the new members
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
            // delete a member after checking it
            $scope.deleteMember = function(id) {
                Members.delete(id)
                    // if successful creation, call our get function to get all the new members
                    .success(function(data) {
                        $scope.members = data; // assign our new list of members
                    });
            };

    })

    .controller('memberUpdateController', function($scope, $routeParams, Members, fileUpload){
    $scope.editMode = 'update';
    
        Members.get($routeParams.member_id)
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
            $scope.updateMember = function(id) {
                console.log('update member');
                /* Get member data for the user to update */
                Members.update($routeParams.member_id, $scope.formData)
                    .success(function(data){
                        $scope.formData = {}; // clear the form 
                        $scope.message = data;
                });
                
            };

            // DELETE ==================================================================
            // delete a member after checking it
            $scope.deleteMember = function(id) {
                Members.delete(id)
                    // if successful creation, call our get function to get all the new members
                    .success(function(data) {
                        $scope.members = data; // assign our new list of members
                    });
            };

    });