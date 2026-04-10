// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IMembershipPass {
    event MemberAdded(address indexed user, address indexed operator);
    event MemberRemoved(address indexed user, address indexed operator);

    function owner() external view returns (address);

    function isMember(address user) external view returns (bool);

    function getMembers() external view returns (address[] memory);

    function getMemberCount() external view returns (uint256);

    function addMember(address user) external;

    function addMember(address[] calldata users) external;

    function removeMember(address user) external;
}
