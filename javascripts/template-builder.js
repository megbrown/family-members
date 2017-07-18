"use strict";

let $ = require('jquery');
let familyListTemplate = require('../templates/family.hbs');

module.exports.makeFamilyList = (familyList) => {
  return familyListTemplate({family: familyList});
};