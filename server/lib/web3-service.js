const Web3 = require("web3");
const ethers = require("ethers");
const ABI = require("./abi");

const Web3Service = {
  web3: null,
  eth: null,
  myContractInstance: null,
  contractABI: ABI,
  contractAddr: null,

  init: function(ADDR, NODE_ADDR) {
    this.contractAddr = ADDR;

    var providers = ethers.providers;

    // Connect to a local Parity instance
    var provider = new providers.JsonRpcProvider(NODE_ADDR, "testnet");

    this.myContractInstance = new ethers.Contract(
      this.contractAddr,
      ABI,
      provider
    );
  }
};

module.exports = Web3Service;
