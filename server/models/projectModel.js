/*
#############################################################################################
# File:         projectModel.js
# Description:  Defines the project model
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
    name        : String,
    description : String,
    projectURL  : String,
    screenshot  : String,
    dateAdded   : Date
});