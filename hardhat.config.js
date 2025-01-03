require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      // This is the default network for running a local Hardhat node
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat local node URL
      chainId: 31337, // Match the Hardhat local node chain ID
    },
  },
};
