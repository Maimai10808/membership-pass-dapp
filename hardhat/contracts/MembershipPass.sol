// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IMembershipPass} from "./interfaces/IMembershipPass.sol";

contract MembershipPass is IMembershipPass {
    address public override owner;

    mapping(address => bool) private whitelist;

    address[] private members;
    mapping(address => uint256) private memberIndexPlusOne;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function isMember(address user) external view override returns (bool) {
        require(user != address(0), "Invalid address");
        return whitelist[user];
    }

    function getMembers() external view returns (address[] memory) {
        return members;
    }

    function getMemberCount() external view returns (uint256) {
        return members.length;
    }

    function addMember(address user) external override onlyOwner {
        _addMember(user);
    }

    function addMember(address[] calldata users) external override onlyOwner {
        require(users.length > 0, "Empty input");

        for (uint256 i = 0; i < users.length; i++) {
            _addMember(users[i]);
        }
    }

    function removeMember(address user) external override onlyOwner {
        require(user != address(0), "Invalid address");
        require(whitelist[user], "Not a member");

        whitelist[user] = false;

        uint256 index = memberIndexPlusOne[user] - 1;
        uint256 lastIndex = members.length - 1;

        if (index != lastIndex) {
            address lastMember = members[lastIndex];
            members[index] = lastMember;
            memberIndexPlusOne[lastMember] = index + 1;
        }

        members.pop();
        delete memberIndexPlusOne[user];

        emit MemberRemoved(user, msg.sender);
    }

    function _addMember(address user) internal {
        require(user != address(0), "Invalid address");
        require(!whitelist[user], "Already a member");

        whitelist[user] = true;
        members.push(user);
        memberIndexPlusOne[user] = members.length;

        emit MemberAdded(user, msg.sender);
    }
}
