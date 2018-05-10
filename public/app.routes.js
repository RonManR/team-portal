/*
#############################################################################################
# File:         app.routes.js
# Description:  Routes URLs to the correct controllers and view templates
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Electronic Arts, Inc. all rights reserved.
#############################################################################################
*/

angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	
	$routeProvider
	/* Default path */
		.when('/', {
			templateUrl: 'views/pages/home.html',
			controller: 'mainController',
			controllerAs: 'mainCtrl'
		})
		.when('/home', {
			templateUrl: 'views/pages/home.html',
			controller: 'mainController',
			controllerAs: 'mainCtrl'
		})
	
		/* Admin Page */
		.when('/admin', {
			templateUrl: 'views/pages/admin/projectsAll.html',
			controller: 'adminController',
			controllerAs: 'adminCtrl'
			
		})
		/* Admin Project */
		.when('/admin/project', {
			templateUrl: 'views/pages/admin/projectsAll.html',
			controller: 'adminController',
			controllerAs: 'adminCtrl'
			
		})
		/* Admin Project - create */
		.when('/admin/project/create', {
			templateUrl: 'views/pages/admin/projectSingle.html',
			controller: 'adminController',
			controllerAs: 'adminCtrl'
			
		})
		/* Admin Project - update */
		.when('/admin/project/:project_id', {
			templateUrl: 'views/pages/admin/projectSingle.html',
			controller: 'projectUpdateController',
			controllerAs: 'adminCtrl'
			
		})
    
		/* Admin Member */
		.when('/admin/member', {
			templateUrl: 'views/pages/admin/membersAll.html',
			controller: 'memberController',
			controllerAs: 'memberCtrl'
			
		})
		/* Admin Member - create */
		.when('/admin/member/create', {
			templateUrl: 'views/pages/admin/memberSingle.html',
			controller: 'memberController',
			controllerAs: 'memberCtrl'
			
		})
		/* Admin Member - update */
		.when('/admin/member/:member_id', {
			templateUrl: 'views/pages/admin/memberSingle.html',
			controller: 'memberUpdateController',
			controllerAs: 'memberCtrl'
			
		})
		
		/* Get rid of the hash in the URL */
		$locationProvider.html5Mode(true);
});