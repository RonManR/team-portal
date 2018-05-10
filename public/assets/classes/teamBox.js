/*
#############################################################################################
# File:         teamBox.js
# Description:  Creates a component describing a team member
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

function teamBox(){
	/* Default arguments values */
	this.nameFirst =  '';
    this.nameLast = '';
	this.title = '';
	this.screenshotURL = '';
	this.email = '';
    this.parentId = 'section_team';
	
	/* Setting arguments passed in */
	for (var n in arguments[0]) { this[n] = arguments[0][n]; }
	
	/* find the parent DOM element using the parent Id */
	this.parentElement = $("#" + this.parentId);
    
    var team='';
        team+="<div class='team_box'>";
            team+="<div class='team_portrait'><img src='assets/images/"+this.screenshotURL+"' /></div>";
            team+="<div class='team_name'>"+this.nameFirst+" "+this.nameLast+"</div>";
            team+="<div class='team_title'>"+this.title+"</div>";
            team+="<div class='team_email'><a href='mailto:"+this.email+"'>"+this.email+"</a></div>";
        team+="</div><!--END team_box-->";
    
    
    this.parentElement.html(this.parentElement.html()+team);
}