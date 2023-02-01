pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleERC20 {
    address public immutable token;
    bytes32 public immutable merkleRoot;

    mapping(address => bool) public isClaimed;

    constructor(address token_, bytes32 merkleRoot_) {
        token = token_;
        merkleRoot = merkleRoot_;
    }

    function claim(
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external {
        require(!isClaimed[account], "Already claimed.");

        bytes32 node = keccak256(abi.encodePacked(account, amount));

        require(
            MerkleProof.verifyCalldata(merkleProof, merkleRoot, node),
            "Invalid proof."
        );

        isClaimed[account] = true;
    }
}
