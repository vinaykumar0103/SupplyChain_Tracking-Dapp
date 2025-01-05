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

    const createShipment = async (items) => {
        console.log(items);
        const { reciver, pickupTime, distance, price } = items;

        try {
            const web3modal = new web3modal();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                reciver, new Date(pickupTime).getItem(),
                distance,
                ethers.utils.parseEther(price, 18),
                {
                    value: ethers.utils.parseEther(price, 18),
                }
            );
            await createItem.wait();
            console.log(createItem);
        } catch (error) {
            console.log("Some want wrong", error);
        }
    };

    const getAllShipments = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                reciver: shipment.reciver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,

            }));

            return allShipments;
        } catch (error) {
            console.log("Error want getting shipments", error);
        }
    };

    const getAllShipmentsCount = async () => {
       try {
        if(!window.ether) return "Install Metamask";

        const accounts = await window.ethereum.request({
            methos: "eth_accounts",
        })
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const shipmentsCount = await contract.getAllShipmentsCount(accounts[0]);
        return shipmentsCount.toNumber();

       } catch (error) {
        console.log("error want getting shipments count", error);
       }
    };


    const completeShipment = async (completeShip) => {
      console.log(completeShip);

      const { reciver, index } = completeShip;
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            }); 
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer); 

            const transaction = await contract.completeShipment(
                accounts[0],
                reciver,
                index,
                {
                    gasLimit: 3000000,
                }
            );
            transaction.wait();

             console.log(transaction);     
        } catch (error) {
            console.log("Error want completing shipment", error);
        }
    }

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
        if(!window.ethereum) return "Install Metamask";
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const shipment = await contract.getShipment(accounts[0], index * 1);

        const SingleShipment = {
            sender: shipment[0],
            reciver: shipment[1],
            pickupTime: shipment[2].toNumber(),
            deliveryTime: shipment[3].toNumber(),
            distance: shipment[4].toNumber(),
            price: ethers.utils.formatEther(shipment[5].toString()),
            status : shipment[6],
            isPaidq: shipment[7]
        }

        return SingleShipment;
        } catch (error) {
            console.log("Sorry no shipment", error);
        }
    };

    const startShipment = async () => {
        const { reciver, index } = gerproduct();

        try {
            if(!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const web3modal = new web3modal();
            const connection = await web3modal.connect()

            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                reciver,
                index * 1
            );
            shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("Error no shipment", error);
        }
    }

    //CHECK WALLET CONNECTED

    const checkIfWalletConnected = async () => {
        try{
            if(!window.ethereum) return "Connect Wallet";

            const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if(accounts.length) {
            setCurrentUser(accounts[0]);
        } else {
            return ("No account");
        }
        } catch (error) {
            return "wallet not connected";
        }
    
    }

    //CONNECT WALLET FUNCTION

    const connectWallet = async () => {
        try{
            if(!window.ethereum) return "Install MetaMask"
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            setCurrentUser(accounts[0]);
        } catch (error) {
            return "wallet not connected";
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return 
    (
        <TrackingContext.Provider
        value={{
            DappName,
            currentUser,
            connectWallet,
            createShipment,
            getAllShipments,
            getAllShipmentsCount,
            completeShipment,
            getShipment,
            startShipment,


                DappName,
                currentUser,
                connectWallet,
                createShipment,
                getAllShipments,
                getAllShipmentsCount,
                completeShipment,
                getShipment,
                startShipment,
        }}
        >
            {children}
        </TrackingContext.Provider>
    )
};
