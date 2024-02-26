import logo from './logo.svg';
import { connectMetaMask } from './mm';
import Web3 from "web3";
import { useEffect, useState } from 'react';
import { AppStyleForHome } from './style';

const web3 = new Web3(window.ethereum);
const tokenContractAddress = '0x45E12d4efc0F5F950eF143F0E9f2Aff9Ece1f48b'
const tokenContractABI =[
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
        "name": "teamTaxRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "devTaxRate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "airdropTaxRate",
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
        "name": "TEAM_WALLET",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "DEV_WALLET",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "AIRDROP_WALLET",
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
    "name": "AIRDROP_WALLET",
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
    "name": "DEV_WALLET",
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
    "inputs": [],
    "name": "airdropTaxRate",
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
    "name": "devTaxRate",
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
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
        "name": "_TEAM_WALLET",
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
        "name": "_teamTaxRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_devTaxRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_airdropTaxRate",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_teamWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_devWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_airdropWallet",
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
        "name": "_teamTaxRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_devTaxRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_airdropTaxRate",
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
        "name": "_teamWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_devWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_airdropWallet",
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
    "name": "teamTaxRate",
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
]
const airdropContractAddress = '0x3206240f1944Dc0229e2C4165eE395fCbD2bb50E'
const airdropContractABI = [
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
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokensAirdropped",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "airdropAmount",
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
    "name": "airdropWallet",
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
    "name": "getRemainingAirdropBalance",
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
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_airdropWallet",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "numberOfRecipients",
        "type": "uint256"
      }
    ],
    "name": "performAirdrop",
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "setAirdropAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_airdropWallet",
        "type": "address"
      }
    ],
    "name": "setAirdropWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
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
  }
]
const contract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
const airdropContract =  new web3.eth.Contract(airdropContractABI , airdropContractAddress)


function App() {

  const [addTaxExemptedAddress, setAddTaxExemptedAddress] = useState('');
  const [removeTaxExemptedAddress, setRemoveTaxExemptedAddress] = useState('');
  const [taxDistributorAddress, setTaxDistributorAddress] = useState('');
  const [removeTaxDistributorAddress, setRemoveTaxDistributorAddress] = useState('');
  const [maxWalletSize, setMaxWalletSize] = useState('');
  const [taxRate1, setTaxRate1] = useState('');
  const [taxRate2, setTaxRate2] = useState('');
  const [taxRate3, setTaxRate3] = useState('');
  const [transactionLimit, setTransactionLimit] = useState('');
  const [taxReceiver1, setTaxReceiver1] = useState('');
  const [taxReceiver2, setTaxReceiver2] = useState('');
  const [taxReceiver3, setTaxReceiver3] = useState('');
  const [burnTokens, setBurnTokens] = useState('');
  const [getTaxExemptedAddress, setGetTaxExemptedAddress] = useState('');
  const [getDistributorAddress, setGetDistributorAddress] = useState('');
  const [airdropAmount, setAirdropAmount] = useState('');
  const [performAirdropAddress, setPerformAirdropAddress] = useState('');
  const [airdropWallet, setAirdropWallet] = useState('');

  const handleAirdropAmountAddress = (e) => {
    setAirdropAmount(e.target.value);
  };

  const handleAirdropWalletAddress = (e) => {
    setAirdropWallet(e.target.value);
  };

  const handlePerformAirdropAmountAddress = (e) => {
    setPerformAirdropAddress(e.target.value);
  };
  
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

  const handleSetTaxRate1 = (e) => {
    setTaxRate1(e.target.value);
  };

  const handleSetTaxRate2 = (e) => {
    setTaxRate2(e.target.value);
  };

  const handleSetTaxRate3 = (e) => {
    setTaxRate3(e.target.value);
  };

  const handleSetTransactionLimit = (e) => {
    setTransactionLimit(e.target.value);
  };
  
  const handleSetTaxReceiver1 = (e) => {
    setTaxReceiver1(e.target.value);
  };

  const handleSetTaxReceiver2 = (e) => {
    setTaxReceiver2(e.target.value);
  };

  const handleSetTaxReceiver3 = (e) => {
    setTaxReceiver3(e.target.value);
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
      let tax1 = Math.round(taxRate1 * 10)
      let tax2 = Math.round(taxRate2 * 10)
      let tax3 = Math.round(taxRate3 * 10)

      console.log(tax1 ,tax2)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setTaxRate(tax1, tax2, tax3).send({ from: userAddress });
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      }
    } catch (e) {
      alert("Transaction has been Failed")
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
      const txData = await contract.methods.setTransactionLimit(limit).send({ from: userAddress });
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
      console.log(taxReceiver1, taxReceiver2 , taxReceiver3)
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      console.log(userAddress)
      const txData = await contract.methods.setTaxReceiver(taxReceiver1, taxReceiver2, taxReceiver3).send({ from: userAddress });
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
      let data1 = parseFloat(txData[0])
      let data2 = parseFloat(txData[1])
      let data3 = parseFloat(txData[2])


      alert(`The current TEAM Tax Rate is ${data1 / 10} %, current DEV Tax Rate is ${data2 / 10} % current Airdrop Tax Rate is ${data3 / 10} %`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getTaxRecieversContract() {
    try {
      const txData1 = await contract.methods.getTaxRecievers().call();
      const txData2 = await contract.methods.DEV_WALLET().call();
      const txData3 = await contract.methods.AIRDROP_WALLET().call();

      alert(`The current TEAM Tax Receiver address is ${txData1}, current DEV Tax Receiver address is ${txData2} and  current Airdrop Tax Receiver address is ${txData3}`)
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

  async function getRemainingAirdropBalance() {
    try {
      const txData = await airdropContract.methods.getRemainingAirdropBalance().call();
      alert(`The remaining Air Drop balance is ${txData} WCT`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getAirdropAmountContract() {
    try {
      const txData = await airdropContract.methods.airdropAmount().call();
      alert(`The current Air Drop Amount is ${web3.utils.fromWei(txData , 'ether')} WCT`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function getAirdropWalletContract() {
    try {
      const txData = await airdropContract.methods.airdropWallet().call();
      alert(`The current Air Drop Wallet Address is ${txData}`)
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function setAirdropAmountContract() {
    try {
      let amount = airdropAmount * 10 ** 18
      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      const txData = await airdropContract.methods.setAirdropAmount(amount.toString()).send({from : userAddress});
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function performAirdropAmountContract() {
    try {

      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      const txData = await airdropContract.methods.performAirdrop(performAirdropAddress , '1' ).send({from : userAddress});
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
    } catch (e) {
      alert("Transaction has been failed. Please Check Your Input")
    }
  }

  async function setAirdropWalletContract() {
    try {

      const connect = await connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      const txData = await airdropContract.methods.setAirdropWallet(airdropWallet).send({from : userAddress});
      if (txData.status == 1) {
        alert("Transaction has been succesful")
      } else {
        alert("Transaction FAILED")
      }
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
    <input value={getTaxExemptedAddress} onChange={handleGetTaxExemptedAddressChange} className="wide-input" placeholder='Tax Exempted Address'/>
    <button onClick={getTaxExemptedAddressContract} className='button' > Is Tax Exempted</button>
    <br></br>
   
    <br></br>
    <input value={getDistributorAddress} onChange={handleGetDistributorAddressChange} className="wide-input" placeholder='Distributor Address'/>
    <button onClick={getDistributorAddressContract} className='button' > Is Distributor</button>

    <h2> Setter/OnlyOwner Functions</h2>
    <button onClick={pauseContract} className='button' > Pause Contract</button>
    <button onClick={unPauseContract} className='button' > UnPause Contract</button>
    <button onClick={enableTradingContract} className='button' > Enable Trading</button>
    <button onClick={disableTradingContract} className='button' > Disable Trading</button>
    <br></br>

    <br></br>
    <input value={addTaxExemptedAddress} onChange={handleAddTaxExemptedAddressChange} className="wide-input" placeholder='Add Tax Exempted Address'/>
    <button onClick={addTaxExemptedAddressContract} className='button' >addTaxExemptedAddress</button>
    <br></br>

    <br></br>
    <input value={removeTaxExemptedAddress} onChange={handleRemoveTaxExemptedAddress} className="wide-input" placeholder='Remove Tax Exempted Address'/>
    <button onClick={removeTaxExemptedAddressContract} className='button' >removeTaxExemptedAddress</button>
    <br></br>

    <br></br>
    <input value={taxDistributorAddress} onChange={handleTaxDistributorAddress} className="wide-input" placeholder='Add Distributor Address'/>
    <button onClick={addTaxDistributorAddressContract} className='button' >addTaxDistributorAddress</button>
    <br></br>

    <br></br>
    <input value={removeTaxDistributorAddress} onChange={handleRemoveTaxDistributorAddress} className="wide-input" placeholder='Remove Distributor Address'/>
    <button onClick={removeTaxDistributorAddressContract} className='button' >removeTaxDistributorAddress</button>
    <br></br>

    <br></br>
    <input value={maxWalletSize} onChange={handleMaxWalletSize} className="wide-input" placeholder='Wallet Size'/>
    <button onClick={maxWalletSizeContract} className='button' >maxWalletSize</button>
    <br></br>

    <br></br>
    <input value={taxRate1} onChange={handleSetTaxRate1} className="wide-input" placeholder='Team Tax Rate'/>
    <input value={taxRate2} onChange={handleSetTaxRate2} className="wide-input" placeholder='Dev Tax Rate'/>
    <input value={taxRate3} onChange={handleSetTaxRate3} className="wide-input" placeholder='Airdrop Tax Rate'/>

    <button onClick={setTaxRateContract} className='button' >setTaxRate</button>
    <br></br>

    <br></br>
    <input value={transactionLimit} onChange={handleSetTransactionLimit} className="wide-input" placeholder='Set Transaction Limit'/>
    <button onClick={setTransactionLimitContract} className='button' >setTransactionLimitContract</button>
    <br></br>

    <br></br>
    <input value={taxReceiver1} onChange={handleSetTaxReceiver1} className="wide-input" placeholder='Team Tax Receiver Address'/>
    <input value={taxReceiver2} onChange={handleSetTaxReceiver2} className="wide-input" placeholder='Dev Tax Receiver Address'/>
    <input value={taxReceiver3} onChange={handleSetTaxReceiver3} className="wide-input" placeholder='Airdrop Tax Receiver Address'/>

    <button onClick={setTaxReceiverContract} className='button' >setTaxReceiverContract</button>
    <br></br>

    <br></br>
    <input value={burnTokens} onChange={handleBurnTokens} className="wide-input" placeholder='Token Amount to Burn'/>
    <button onClick={burnTokensContract} className='button' >burnTokensContract</button>
    <br></br>

    <h2> Air Drop Functions</h2>

    <button onClick={getRemainingAirdropBalance} className='button' > Remaining Air Drop Balance</button>
    <button onClick={getAirdropAmountContract} className='button' > Current Air Drop Amount</button>
    <button onClick={getAirdropWalletContract} className='button' > Current Air Drop Wallet Address</button>

    <br></br>

    <br></br>
    <input value={airdropAmount} onChange={handleAirdropAmountAddress} className="wide-input" placeholder='Set Airdrop Amount'/>
    <button onClick={setAirdropAmountContract} className='button' >Set Airdrop Amount</button>
    <br></br>

    <br></br>
    <input value={airdropWallet} onChange={handleAirdropWalletAddress} className="wide-input" placeholder='Set Airdrop Wallet Address'/>
    <button onClick={setAirdropWalletContract} className='button' >Set Airdrop Wallet</button>
    <br></br>

    <br></br>
    <input value={performAirdropAddress} onChange={handlePerformAirdropAmountAddress} className="wide-input" placeholder='Set Airdrop Address'/>
    <button onClick={performAirdropAmountContract} className='button' >Perform Airdrop</button>
    <br></br>

    </AppStyleForHome>
  </>
}

export default App;
