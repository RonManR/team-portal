/*
#############################################################################################
# File:         config.js
# Description:  Holds configuration variables
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

module.exports = {
	'port': process.env.PORT || 32102, 
	'database': 'mongodb://localhost:27017/team-portal', 
};