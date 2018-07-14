var Web3 = require("web3");
var Eth = require("ethjs");
var ABI = require("../abi");

var ethers = require("ethers");

var MyWeb3 = {
  web3: null,
  eth: null,
  myContractInstance: null,
  contractABI: ABI,
  contractAddr: null,

  init: function(ADDR, NODE_ADDR) {
    this.contractAddr = ADDR;
    // this.web3 = new Web3(new Web3.providers.HttpProvider('http://d4b08598.ngrok.io'));
    // this.eth = new Eth(this.web3.currentProvider);

    var providers = ethers.providers;

    // Connect to a local Parity instance
    var provider = new providers.JsonRpcProvider(NODE_ADDR, "testnet");
    // var Eth = require('ethjs')
    provider.getBlockNumber().then(function(blockNumber) {
      console.log("Current block number from myWeb3: " + blockNumber);
    });

    this.myContractInstance = new ethers.Contract(
      this.contractAddr,
      ABI,
      provider
    );

    // this.myContractInstance = MyContract.at(this.contractAddr);
  }
};

module.exports = MyWeb3;
