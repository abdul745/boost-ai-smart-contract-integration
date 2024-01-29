import logo from './logo.svg';
import { connectMetaMask } from './mm';
import Web3 from "web3";
import { useEffect, useState } from 'react';
import { AppStyleForHome } from './style';

const web3 = new Web3(window.ethereum);

const contractAddress = "0x0ddEED958a6B1d31E2F797Df842a869BE9D890D1";
const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "TaxRate",
        "type": "uint256"
      }
    ],
    "name": "TaxRateSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "TAX_RECEIVER",
        "type": "address"
      }
    ],
    "name": "TaxReceiversUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "TokensLimit",
        "type": "uint256"
      }
    ],
    "name": "TokensTXLimit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "TradeStatus",
        "type": "bool"
      }
    ],
    "name": "TradingStatusChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "WalletTokenTxLimit",
        "type": "uint256"
      }
    ],
    "name": "WalletTokensLimitUpdated",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "MAX_WALLET_SIZE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TAX_RECEIVER",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TEAM_WALLET",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_dexPair",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_transferFlag",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_distributorAddress",
        "type": "address"
      }
    ],
    "name": "addTaxDistributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_exemptedAddress",
        "type": "address"
      }
    ],
    "name": "addTaxExemptedAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dexRouterAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "disableTrading",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "distributeTax",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "enableTrading",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractETHBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTaxRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTaxRecievers",
    "outputs": [
      {
        "internalType": "address",
        "name": "_TAX_RECEIVER",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTransactionLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tokenSymbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_totalSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_taxRate",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isDistributorAddress",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isExemptedFromTax",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isTradingEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_distributorAddress",
        "type": "address"
      }
    ],
    "name": "removeTaxDistributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_exemptedAddress",
        "type": "address"
      }
    ],
    "name": "removeTaxExemptedAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dexPairAddress",
        "type": "address"
      }
    ],
    "name": "setDexPairAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dexRouterAddress",
        "type": "address"
      }
    ],
    "name": "setDexRouterAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_maxWalletSize",
        "type": "uint256"
      }
    ],
    "name": "setMaxWalletSize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_taxRate",
        "type": "uint256"
      }
    ],
    "name": "setTaxRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_taxReceiver",
        "type": "address"
      }
    ],
    "name": "setTaxReceiver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokensTXLimit",
        "type": "uint256"
      }
    ],
    "name": "setTransactionLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "taxRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokensTXLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

const contract = new web3.eth.Contract(ABI, contractAddress);


function App() {

  const [addTaxExemptedAddress, setAddTaxExemptedAddress] = useState('');
  const [removeTaxExemptedAddress, setRemoveTaxExemptedAddress] = useState('');
  const [taxDistributorAddress, setTaxDistributorAddress] = useState('');
  const [removeTaxDistributorAddress, setRemoveTaxDistributorAddress] = useState('');
  const [maxWalletSize, setMaxWalletSize] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [dexRouterAddress, setDexRouterAddress] = useState('');
  const [dexPairAddress, setDexPairAddress] = useState('');
  const [transactionLimit, setTransactionLimit] = useState('');
  const [taxReceiver, setTaxReceiver] = useState('');
  const [burnTokens, setBurnTokens] = useState('');
  const [getTaxExemptedAddress, setGetTaxExemptedAddress] = useState('');
  const [getDistributorAddress, setGetDistributorAddress] = useState('');


  
  const handleAddTaxExemptedAddressChange = (e) => {
    setAddTaxExemptedAddress(e.target.value);
  };

  const handleRemoveTaxExemptedAddress = (e) => {
    setRemoveTaxExemptedAddress(e.target.value);
  };

  const handleTaxDistributorAddress = (e) => {
    setTaxDistributorAddress(e.target.value);
  };

  const handleRemoveTaxDistributorAddress = (e) => {
    setRemoveTaxDistributorAddress(e.target.value);
  };

  const handleMaxWalletSize = (e) => {
    setMaxWalletSize(e.target.value);
  };

  const handleSetTaxRate = (e) => {
    setTaxRate(e.target.value);
  };

  const handleSetDexRouterAddress = (e) => {
    setDexRouterAddress(e.target.value);
  };

  const handleSetDexPairAddress = (e) => {
    setDexPairAddress(e.target.value);
  };

  const handleSetTransactionLimit = (e) => {
    setTransactionLimit(e.target.value);
  };
  
  const handleSetTaxReceiver = (e) => {
    setTaxReceiver(e.target.value);
  };

  const handleBurnTokens = (e) => {
    setBurnTokens(e.target.value);
  };

  const handleGetTaxExemptedAddressChange = (e) => {
    setGetTaxExemptedAddress(e.target.value);
  };

  const handleGetDistributorAddressChange = (e) => {
    setGetDistributorAddress(e.target.value);
  };

  async function pauseContract() {
    try {
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      // console.log(userAddress)
      const txData = await contract.methods.pause().send({ from: userAddress });
      // console.log(txData.status , "PAUSE ")

      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed")
    }
  }

  async function unPauseContract() {
    try {
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      // console.log(userAddress)
      const txData = await contract.methods.unpause().send({ from: userAddress });
      // console.log(txData.status , "UNPAUSE")
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed")
    }
  }

  async function enableTradingContract() {
    try {
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      // console.log(userAddress)
      const txData = await contract.methods.enableTrading().send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed")
    }

  }

  async function disableTradingContract() {
    try {
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.disableTrading().send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed")
    }
  }

  async function addTaxExemptedAddressContract() {
    try {
      console.log(addTaxExemptedAddress)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.addTaxExemptedAddress(addTaxExemptedAddress).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }

  }

  async function removeTaxExemptedAddressContract() {
    try {
      console.log(removeTaxExemptedAddress)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.removeTaxExemptedAddress(removeTaxExemptedAddress).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }

  }

  async function addTaxDistributorAddressContract() {
    try {
      console.log(taxDistributorAddress)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.addTaxDistributor(taxDistributorAddress).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function removeTaxDistributorAddressContract() {
    try {
      console.log(removeTaxDistributorAddress)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.removeTaxDistributor(removeTaxDistributorAddress).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function maxWalletSizeContract() {
    try {
      let walletSize = maxWalletSize * 10 ** 18
      console.log(walletSize)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setMaxWalletSize(walletSize.toString()).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function setTaxRateContract() {
    try {
      let tax = Math.round(taxRate * 10)
      console.log(tax)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setTaxRate(tax).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      }
    } catch (e) {
      alert("Transaction has been Failed")
    }
  }

  async function setDexRouterAddressContract() {
    try {
      console.log(dexRouterAddress)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setDexRouterAddress(dexRouterAddress).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function setDexPairAddressContract() {
    try {
      console.log(dexPairAddress)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setDexPairAddress(dexPairAddress).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function setTransactionLimitContract() {
    try {
      let limit = transactionLimit * 10 **18
      console.log(limit)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      // console.log(userAddress)
      const txData = await contract.methods.setTransactionLimit(limit.toString()).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getTransactionLimitContract() {
    try {
      const txData = await contract.methods.getTransactionLimit().call();
      alert(`The current Transaction Limit is ${(web3.utils.fromWei(txData.toString(), 'ether'))} BST`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function setTaxReceiverContract() {
    try {
      console.log(taxReceiver)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setTaxReceiver(taxReceiver).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function burnTokensContract() {
    try {
      let tokens = burnTokens * 10 ** 18
      console.log(tokens)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.burn(tokens).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getTaxRateContract() {
    try {
      const txData = await contract.methods.getTaxRate().call();
      let data = parseFloat(txData)
      alert(`The current Tax Rate is ${data / 10} %`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getTaxRecieversContract() {
    try {
      const txData = await contract.methods.getTaxRecievers().call();
      alert(`The current Tax Receiver address is ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getContractEthBalanceContract() {
    try {
      const txData = await contract.methods.getContractETHBalance().call();
      alert(`The current Contract Balance is ${(web3.utils.fromWei(txData.toString(), 'ether'))} ETH`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getMaxWalletSizeContract() {
    try {
      const txData = await contract.methods.MAX_WALLET_SIZE().call();
      alert(`The current Max Wallet Size is ${(web3.utils.fromWei(txData.toString(), 'ether'))} BST`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getTaxExemptedAddressContract() {
    try {
      const txData = await contract.methods.isExemptedFromTax(getTaxExemptedAddress).call();
      alert(`The address ${getTaxExemptedAddress} is exempted from Tax :  ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getIsTradingEnabledContract() {
    try {
      const txData = await contract.methods.isTradingEnabled().call();
      alert(`The trading enable is ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getDistributorAddressContract() {
    try {
      const txData = await contract.methods.isDistributorAddress(getDistributorAddress).call();
      alert(`The address ${getDistributorAddress} is a Distributor Address :  ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getDexRouterAddressContract() {
    try {
      const txData = await contract.methods.dexRouterAddress().call();
      alert(`The current Dex Router Address is ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getDexPairAddressContract() {
    try {
      const txData = await contract.methods._dexPair().call();
      alert(`The current Dex Pair Address is ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }





  

  return <>
  <AppStyleForHome>
    <h2> Connect MetaMask</h2>
    <button onClick={connectMetaMask} className='button' > connectMetaMask</button>

    <h2> Getter Functions</h2>
    <button onClick={getTransactionLimitContract} className='button' > Transaction Limit Contract</button>
    <button onClick={getTaxRateContract} className='button' > Tax Rate Contract</button>
    <button onClick={getTaxRecieversContract} className='button' > Get Tax Receiver</button>
    <button onClick={getContractEthBalanceContract} className='button' > Get Contract Balance</button>
    <button onClick={getIsTradingEnabledContract} className='button' > Is Trading Enabled</button>
    <button onClick={getMaxWalletSizeContract} className='button' > Max Wallet Size</button>
    <button onClick={getDexRouterAddressContract} className='button' > Dex Router Address</button>
    <button onClick={getDexPairAddressContract} className='button' > Dex Pair Address</button>

    <br></br>

    <br></br>
    <input value={getTaxExemptedAddress} onChange={handleGetTaxExemptedAddressChange} className="wide-input" />
    <button onClick={getTaxExemptedAddressContract} className='button' > Is Tax Exempted</button>
    <br></br>
   
    <br></br>
    <input value={getDistributorAddress} onChange={handleGetDistributorAddressChange} className="wide-input" />
    <button onClick={getDistributorAddressContract} className='button' > Is Distributor</button>




    
    <h2> Setter/OnlyOwner Functions</h2>
    <button onClick={pauseContract} className='button' > Pause Contract</button>
    <button onClick={unPauseContract} className='button' > UnPause Contract</button>
    <button onClick={enableTradingContract} className='button' > Enable Trading</button>
    <button onClick={disableTradingContract} className='button' > Disable Trading</button>
    <br></br>

    <br></br>
    <input value={addTaxExemptedAddress} onChange={handleAddTaxExemptedAddressChange} className="wide-input" />
    <button onClick={addTaxExemptedAddressContract} className='button' >addTaxExemptedAddress</button>
    <br></br>

    <br></br>
    <input value={removeTaxExemptedAddress} onChange={handleRemoveTaxExemptedAddress} className="wide-input"/>
    <button onClick={removeTaxExemptedAddressContract} className='button' >removeTaxExemptedAddress</button>
    <br></br>

    <br></br>
    <input value={taxDistributorAddress} onChange={handleTaxDistributorAddress} className="wide-input"/>
    <button onClick={addTaxDistributorAddressContract} className='button' >addTaxDistributorAddress</button>
    <br></br>

    <br></br>
    <input value={removeTaxDistributorAddress} onChange={handleRemoveTaxDistributorAddress} className="wide-input"/>
    <button onClick={removeTaxDistributorAddressContract} className='button' >removeTaxDistributorAddress</button>
    <br></br>

    <br></br>
    <input value={maxWalletSize} onChange={handleMaxWalletSize} className="wide-input"/>
    <button onClick={maxWalletSizeContract} className='button' >maxWalletSize</button>
    <br></br>

    <br></br>
    <input value={taxRate} onChange={handleSetTaxRate} className="wide-input"/>
    <button onClick={setTaxRateContract} className='button' >setTaxRate</button>
    <br></br>

    <br></br>
    <input value={dexRouterAddress} onChange={handleSetDexRouterAddress} className="wide-input" />
    <button onClick={setDexRouterAddressContract} className='button' >setDexRouterAddressContract</button>
    <br></br>

    <br></br>
    <input value={dexPairAddress} onChange={handleSetDexPairAddress} className="wide-input"/>
    <button onClick={setDexPairAddressContract} className='button' >setDexPairAddressContract</button>
    <br></br>

    <br></br>
    <input value={transactionLimit} onChange={handleSetTransactionLimit} className="wide-input"/>
    <button onClick={setTransactionLimitContract} className='button' >setTransactionLimitContract</button>
    <br></br>

    <br></br>
    <input value={taxReceiver} onChange={handleSetTaxReceiver} className="wide-input"/>
    <button onClick={setTaxReceiverContract} className='button' >setTaxReceiverContract</button>
    <br></br>

    <br></br>
    <input value={burnTokens} onChange={handleBurnTokens} className="wide-input"/>
    <button onClick={burnTokensContract} className='button' >burnTokensContract</button>
    <br></br>
    </AppStyleForHome>
  </>
}

export default App;
