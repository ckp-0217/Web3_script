const keccak256 = require("keccak256");
const MerkleTree = require("ethers-merkletree");
const ethers = require('ethers');

const myAllowList = [
    {
        address: '0x68AC5eE798Ac6F6B0A42F9b3abc3C9FD26dbdeA6',
        amount: ethers.utils.parseEther("1"),
    },
    {
        address: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        amount: ethers.utils.parseEther("1")
    },
    {
        address: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
        amount: ethers.utils.parseEther("1")
    }
];
const leafSignature = [
    { type: 'address', name: 'address' },
    { type: 'uint256', name: 'amount' },
];

const merkleTree = new MerkleTree.WMerkleTree(myAllowList, leafSignature);
//获取根节点
const root = merkleTree.getHexRoot();
// 设置root
console.log(root);

//上链验证
const merkleProof = merkleTree.getHexProof(3);
console.log(merkleProof)