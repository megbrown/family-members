"use strict";

let $ = require('jquery');
let db = require('./family-factory');
let templates = require('./template-builder');
let $container = $(".print-to-DOM");

module.exports.loadFamilyToDom = () => {
	db.getFamily()
  .then( (familyData) => {
    console.log("familyData", familyData);
    let familyList = templates.makeFamilyList(familyData);
    $container.html(familyList);
  });
};