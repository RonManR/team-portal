/*
#############################################################################################
# File:         memberModel.js
# Description:  Defines the team member model
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

var mongoose = require('mongoose');

module.exports = mongoose.model('Member', {
    nameFirst   : String,
    nameLast    : String,
    title       : String,
    screenshot  : String,
    email       : String
});