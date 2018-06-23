const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "allower",
        type: "address"
      },
      {
        indexed: false,
        name: "allowedAddress",
        type: "address"
      }
    ],
    name: "AccessAllowed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "revoker",
        type: "address"
      },
      {
        indexed: false,
        name: "revokedAddress",
        type: "address"
      }
    ],
    name: "AccessRevoked",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "incomingPerson",
        type: "address"
      }
    ],
    name: "giveAccess",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "incomingPerson",
        type: "address"
      }
    ],
    name: "revokeAccess",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "accessAllowance",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "allowedAddresses",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "incomingPerson",
        type: "address"
      }
    ],
    name: "checkAccess",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getAllAllowedAddresses",
    outputs: [
      {
        name: "",
        type: "address[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalAccesses",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

module.exports = ABI;
