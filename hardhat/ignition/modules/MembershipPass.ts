import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MembershipPassModule", (m) => {
  const membershipPass = m.contract("MembershipPass", []);

  return { membershipPass };
});
