"use strict";

let $ = require('jquery');
let fbURL = "https://nss-megan-family.firebaseio.com/";

function addIds(familyData) {
  var idArr = Object.keys(familyData);
  console.log("idArr", idArr);
  idArr.forEach( (key) => {
    familyData[key].id = key;
  });
  console.log("familyData after ids", familyData);
  return familyData;
}

module.exports.getFamily = () => {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/family.json`//<.json is important!
    }).done( (familyData) => {
      console.log("familyData", familyData );
      let amendedFamilyData = addIds(familyData);
      resolve(amendedFamilyData);
    });
  });
};