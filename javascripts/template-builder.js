"use strict";

let $ = require('jquery');
let familyListTemplate = require('../templates/family.hbs');
let formTemplate = require('../templates/form.hbs');

module.exports.makeFamilyList = (familyList) => {
  return familyListTemplate({family: familyList});
};

module.exports.buildFamilyForm = (family) => {
	let familyItem = {
		name: "",
		gender: "",
		age: "",
		skills: "",
		btnText: "Save Family Member",
		header: "Add New Family Member",
		btnClass: "save_new_btn"
	};

	let familyData = family || familyItem;
	return formTemplate(familyData);
};