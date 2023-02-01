const Web3 = require('web3')
// const rpcURL = "https://eth-mainnet.g.alchemy.com/v2/3c99QZa524ne2D9roIrZWAnC58gExnXU"
const rpcURL = "https://ethnode.digifttest.com/"

const web3 = new Web3(rpcURL)

// 查询最新区块
web3.eth.getBlockNumber().then(console.log)

// for (let index = 15643107; index > 15623027; index--){
//     web3.eth.getBlock(index).then((value)=>{console.log(value.timestamp)})

// }
var Tx = require('ethereumjs-tx').Transaction;
web3.eth.getBlockNumber().then(console.log)

var privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

web3.eth.net.getId().then((chainId)=>{
    console.log("chainId==> ", chainId);
});
var rawTx = {
    nonce: '0x30',
    gasPrice: '0x09184e72a000',
    gasLimit: web3.utils.toHex(21000),
    chainId: 15,
    to: '0xBC593fDb62EE1c1dF173Ad695F05689Db60C28f8',
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),

}
// let gas = await web3.eth.estimateGas(rawTx)
// rawTx.gas = gas

var tx = new Tx(rawTx);
//签名
tx.sign(privateKey);
// console.log(tx.serialize().toString('hex'));
console.log('v: ', tx.v.toString('hex'));
console.log('r: ', tx.r.toString('hex'));
console.log('s: ', tx.s.toString('hex'));
// 提前获取交易hash
console.log('hash: ', web3.utils.keccak256(tx.serialize().toString('hex')));

//0x93b4355de4519525792db182b8893e87ed995c2efe4606cb885bbec1e104f59a
//0x2ae17d886b66f588948396b48df74985be0ce728b157e56207be272817a0d56b
//0xf1bb433b8d0619bebac6c6c6ea106e9ea5bfd9f6331103149c2188d633151f22
//发送交易
web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
    .on('receipt', console.log);


