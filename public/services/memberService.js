/*
#############################################################################################
# File:         memberService.js
# Description:  Service to call the API for team member tasks
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

angular.module('memberService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Members', function($http) {
        return {
            all : function() {
                return $http.get('/api/members');
            },
            get : function(id) {
                return $http.get('/api/member/' + id);
            },
            create : function(memberData) {
                return $http.post('/api/members', memberData);
            },
            delete : function(id) {
                return $http.delete('/api/members/' + id);
            },
            update : function(id, memberData) {
                return $http.put('/api/member/update/' + id, memberData);
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