const Web3Service = require("./web3-service");

exports.checkAccess = function(addr) {
  return new Promise((resolve, reject) => {
    Web3Service.myContractInstance
      .checkAccess(addr)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};
