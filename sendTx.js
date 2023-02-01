const Web3 = require('web3')
const rpcURL = "https://ethnode.digifttest.com/"
// const rpcURL = "https://eth-mainnet.g.alchemy.com/v2/3c99QZa524ne2D9roIrZWAnC58gExnXU"

const web3 = new Web3(rpcURL)
var Tx = require('ethereumjs-tx').Transaction;
web3.eth.getBlockNumber().then(console.log)

var privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

var rawTx = {
  nonce: '0x30',
  gasPrice: '0x59682f07',
  gasLimit: '0x5208',
  to: '0xBC593fDb62EE1c1dF173Ad695F05689Db60C28f8',
  value: '0x',
  //data: 若是调用合约则为abi
  data: '0x1'
}
// let gas = await web3.eth.estimateGas(rawTx)
// rawTx.gas = gas

var tx = new Tx(rawTx);
// console.log(tx.serialize().toString('hex'));
console.log('v',tx.v.toString('hex'));
console.log('r',tx.r.toString('hex'));
console.log('s',tx.s.toString('hex'));

//签名
tx.sign(privateKey);
// console.log(tx.serialize().toString('hex'));
console.log('v: ',tx.v.toString('hex'));
console.log('r: ',tx.r.toString('hex'));
console.log('s: ',tx.s.toString('hex'));
 // 提前获取交易hash
console.log('hash: ',web3.utils.keccak256(tx.serialize().toString('hex')));

//0x93b4355de4519525792db182b8893e87ed995c2efe4606cb885bbec1e104f59a
//0x2ae17d886b66f588948396b48df74985be0ce728b157e56207be272817a0d56b
//0xf1bb433b8d0619bebac6c6c6ea106e9ea5bfd9f6331103149c2188d633151f22
//发送交易
web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
.on('receipt', console.log);

