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

module.exports.getFamilyById = (familyId) => {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/family/${familyId}.json`
    }).done ( (familyData) => {
      resolve(familyData);
    });
  });
};

module.exports.addFamily = (familyFormObj) => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}/family.json`,
      type: "POST",
      data: JSON.stringify(familyFormObj),
      dataType: "json"
    }).done( (familyId) => {
      resolve(familyId);
    });
  });
};

module.exports.saveEditedFamily = (familyObj, familyId) => {
  return new Promise( (resolve, reject) => {
    if (familyId) {
      $.ajax({
        url: `${fbURL}/family/${familyId}.json`,
        type: "PUT",
        data: JSON.stringify(familyObj),
        dataType: "json"
      }).done( (familyData) => {
        resolve(familyData);
      }).fail( (err) => {
        reject(err);
      });
    } else {
      console.log("Your family ID is not good");
    }
  });
};

module.exports.deleteFamily = (familyId) => {
  return new Promise( (resolve, reject) => {
    if (familyId) {
      $.ajax({
        url: `${fbURL}/family/${familyId}.json`,
        type: "DELETE"
      }).done( (familyData) => {
        resolve(familyData);
      }).fail( (err) => {
        reject(err);
      });
    } else {
      console.log("Your family ID is not good");
    }
  });
};