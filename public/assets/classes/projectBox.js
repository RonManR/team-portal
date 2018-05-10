/*
#############################################################################################
# File:         projectBox.js
# Description:  Creates a component describing a project
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

function projectBox() {

	/* Default arguments values */
	this.name =  '';
	this.description = '';
	this.screenshotURL = '';
    this.projectURL = '';
	this.dateAdded = '';
    this.parentId = 'section_projects';
    this.daysToDisplayNew = 3;
    
	/* Setting arguments passed in */
	for (var n in arguments[0]) { this[n] = arguments[0][n]; }
    
    /* Parse the date */
    var oneDay = 24*60*60*1000; /* hours * minutes * seconds * milliseconds */
    var dateArray = this.dateAdded.split('/');
    var dateObj = new Date(parseInt(dateArray[2]),(parseInt(dateArray[1])-1),parseInt(dateArray[0]));
    var today = new Date();
    var dayDifference = Math.round(Math.abs((dateObj.getTime() - today.getTime())/(oneDay)));

	
	/* find the parent DOM element using the parent Id */
	this.parentElement = $("#" + this.parentId);
    
    var proj='';
        proj+="<a class='project_box' href='"+this.projectURL+"' target='_blank'>";
            proj+="<div class='project_screenshot'><img src='assets/images/"+this.screenshotURL+"' /></div>";
            
            /* Determine if the new badge should be shown */
            if(dayDifference < this.daysToDisplayNew){
                proj+="<div class='new_badge'></div>";
            }
            proj+="<div class='project_name'>"+this.name+"</div>";
            proj+="<div class='project_description'>"+this.description+"</div>";
        proj+="</a><!--END project_box-->";
    
    this.parentElement.html(this.parentElement.html()+proj);

}