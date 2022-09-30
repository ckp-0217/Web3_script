const Web3 = require('web3')
const rpcURL = "https://eth-mainnet.g.alchemy.com/v2/3c99QZa524ne2D9roIrZWAnC58gExnXU"

const web3 = new Web3(rpcURL)

// 查询最新区块
web3.eth.getBlockNumber().then(console.log)

for (let index = 15643107; index > 15623027; index--){
    web3.eth.getBlock(index).then((value)=>{console.log(value.timestamp)})

}

