import React,{ useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

//INTERNAL IMPORT

import abi from "../Context/abi.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractAbi = tracking.abi;

//FETCHING THE DATA FROM THE BLOCKCHAIN

const fetchContract = (signerProvider) =>
    new ethers.Contract(contractAddress, ContractAbi, signerProvider);

export const TrackingContext = React.createContext();

export const TrackingProvuder = ({ children }) => {
    // STATE VARIABLE
    const DappName = "Product Tracking Dapp";

    const [ currentUser, setCurrentUser ] = useState("");
}

