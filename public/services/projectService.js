/*
#############################################################################################
# File:         projectService.js
# Description:  Service to call the API for projects tasks
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

angular.module('projectService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Projects', function($http) {
        return {
            all : function() {
                return $http.get('/api/projects');
            },
            get : function(id) {
                return $http.get('/api/project/' + id);
            },
            create : function(projectData) {
                return $http.post('/api/projects', projectData);
            },
            delete : function(id) {
                return $http.delete('/api/projects/' + id);
            },
            update : function(id, projectData) {
                return $http.put('/api/project/update/' + id, projectData);
            }
        }
    })
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);

           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })

           .success(function(){
           })

           .error(function(){
           });
        }
     }]);