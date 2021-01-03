require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "172.16.210.165",
      port: 7545,
      network_id: "*", // Match any network id
      websockets: true
    },
    live: {
      host: "172.16.210.165",
      port: 7545,
      network_id: 1
  
    }
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
