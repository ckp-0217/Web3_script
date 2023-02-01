const providers = require('ethers').providers;
const provider = new providers.JsonRpcProvider('http://172.16.2.157:8545')
// const provider = new providers.JsonRpcProvider('http://172.16.2.157:30318')

const fs = require("fs");
let hash = "0x316811344b7f6567df8c874d0cf280d55ad2dbbe6719ed0484f347a4872fc863";
let GetTrace = async () => {
    let trace = provider.send("debug_traceTransaction", [hash, { tracer: 'callTracer', tracerConfig: { onlyTopCall: false, withLog: true } }]);
    trace.then((result) => {
        // console.log(result);
        fs.writeFileSync('result/tr/' + hash + '.json', JSON.stringify(result));
    });
}
let GetTraceDiff = async () => {
    let trace = provider.send("debug_traceTransaction", [hash, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);

    trace.then((result) => {
        // console.log(result);
        removeCodeField(result);
        fs.writeFileSync('result/trDiff/' + hash + '.json', JSON.stringify(result));
    });
}
function removeCodeField(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key === 'code') {
                delete obj[key];
            } else if (typeof obj[key] === 'object') {
                removeCodeField(obj[key]);
            }
        }
    }
}

let GetTx = async () => {
    let trace = provider.getTransaction(hash)
    trace.then((result) => {
        // console.log(result);
        fs.writeFileSync('result/tx/' + hash + '.json', JSON.stringify(result));
    });
}
let GetTx2 = async () => {
    let trace = provider.send("eth_getTransactionByHash", [hash]);
    trace.then((result) => {
        // console.log(result);
        fs.writeFileSync('result/tx/' + hash + '.json', JSON.stringify(result));
    });
}

let GetTxReceipt = async () => {
    let trace = provider.getTransactionReceipt(hash)
    trace.then((result) => {
        // console.log(result);
        fs.writeFileSync('result/re/' + hash + '.json', JSON.stringify(result));
    });
}
let GetTxReceipt2 = async () => {
    let trace = provider.send("eth_getTransactionReceipt", [hash]);
    trace.then((result) => {
        // console.log(result);
        fs.writeFileSync('result/re/' + hash + '.json', JSON.stringify(result));
    });
}
function hexToText(hex) {
    if (hex === null) {
        return;
    } else {
        return hex.match(/[\da-f]{2}/gi).map((h) => String.fromCharCode(parseInt(h, 16))).join('');
    }
}
// GetTx()
GetTx2()
GetTrace()
// GetTxReceipt();
GetTraceDiff()
GetTxReceipt2();
console.log(hexToText("000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000244552433732313a207472616e7366657220746f20746865207a65726f206164647265737300000000000000000000000000000000000000000000000000000000"))