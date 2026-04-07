import hre from "hardhat";
import fs from "node:fs";
import path from "node:path";

type Address = `0x${string}`;

async function main() {
  const connection = await hre.network.connect();
  const { viem } = connection;

  const publicClient = await viem.getPublicClient();
  const [walletClient] = await viem.getWalletClients();

  const deployer = walletClient.account.address as Address;

  const membershipPass = await viem.deployContract("MembershipPass", []);
  const membershipPassAddress = membershipPass.address as Address;

  const chainId = Number(await publicClient.getChainId());
  const networkName = connection.networkName;

  console.log("Network:", networkName);
  console.log("Chain ID:", chainId);
  console.log("Deployer:", deployer);
  console.log("MembershipPass deployed to:", membershipPassAddress);

  const deployment = {
    network: networkName,
    chainId,
    deployer,
    membershipPassAddress,
    createdAt: new Date().toISOString(),
  };

  const deploymentsDir = path.join(process.cwd(), "deployments");
  const deploymentsFile = path.join(deploymentsDir, `${networkName}.json`);

  fs.mkdirSync(deploymentsDir, { recursive: true });
  fs.writeFileSync(
    deploymentsFile,
    JSON.stringify(deployment, null, 2),
    "utf8",
  );

  console.log(`Deployment file saved to: ${deploymentsFile}`);

  const sharedDeploymentPath = path.join(
    process.cwd(),
    "..",
    "packages",
    "membership-pass",
    "src",
    "generated",
    "deployment.ts",
  );

  const sharedDeploymentSource = `import type { MembershipPassDeployment } from "../types";

export const membershipPassDeployment: MembershipPassDeployment = ${JSON.stringify(
    deployment,
    null,
    2,
  )};
`;

  fs.mkdirSync(path.dirname(sharedDeploymentPath), { recursive: true });
  fs.writeFileSync(sharedDeploymentPath, sharedDeploymentSource, "utf8");

  console.log(`Shared deployment manifest saved to: ${sharedDeploymentPath}`);

  const webEnvPath = path.join(process.cwd(), "..", "web", ".env.local");

  const envContent = `NEXT_PUBLIC_CHAIN_ID=${chainId}
NEXT_PUBLIC_MEMBERSHIP_PASS_ADDRESS=${membershipPassAddress}
NEXT_PUBLIC_NETWORK_NAME=${networkName}
`;

  fs.writeFileSync(webEnvPath, envContent, "utf8");

  console.log(`Web env file saved to: ${webEnvPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
