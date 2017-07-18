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

$("#add-family").click( function() {
		console.log("clicked add family");
		let familyForm = templates.buildFamilyForm();
		$container.html(familyForm);
});

function buildFamilyObj() {
	let familyObj = {
		name: $("#form--name").val(),
		gender: $("#form--gender").val(),
		age: $("#form--age").val(),
		skills: [$("#form--skills").val()]
	};
	return familyObj;
}

$(document).on("click", ".save_new_btn", function() {
	console.log("save btn clicked");
	let familyObj = buildFamilyObj();
	db.addFamily(familyObj)
	.then( (familyId) => {
		console.log("family saved", familyId);
		module.exports.loadFamilyToDom();
	});
});

$(document).on("click", ".edit-btn", function() {
	console.log("edit btn clicked");
	let familyId = $(this).data("edit-id");
	db.getFamilyById(familyId)
	.then( (family) => {
		family.id = familyId;
		let editForm = templates.buildFamilyForm(family);
		$container.html(editForm);
	});
});

$(document).on("click", ".save_edit_btn", function() {
	console.log("saving edited family");
	let familyObj = buildFamilyObj();
	let familyId = $(this).attr("id");
	db.saveEditedFamily(familyObj, familyId)
	.then( (data) => {
		console.log("family updated", data);
		module.exports.loadFamilyToDom();
	});
});
