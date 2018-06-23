"use strict";

var myWeb3 = require("../providers/myWeb3");

exports.checkAccess = function(addr) {
  return new Promise((resolve, reject) => {
    myWeb3.myContractInstance
      .checkAccess(addr)
      .then(result => {
        console.log("result from checkAddress", result);
        resolve(result);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
