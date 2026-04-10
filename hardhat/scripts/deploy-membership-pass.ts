import hre from "hardhat";
import path from "node:path";
import MembershipPassModule from "../ignition/modules/MembershipPass.js";
import { exportDeploymentArtifacts } from "../tools/export/index.js";

async function main() {
  const connection = await hre.network.connect();

  const chainIdHex = await connection.provider.request({
    method: "eth_chainId",
    params: [],
  });

  const chainId = Number(BigInt(chainIdHex));
  const isLocalhost = connection.networkName === "localhost";

  const deploymentId = isLocalhost
    ? `chain-${chainId}-${Date.now()}`
    : `chain-${chainId}`;

  const { membershipPass } = await connection.ignition.deploy(
    MembershipPassModule,
    {
      deploymentId,
      parameters: path.resolve(
        import.meta.dirname,
        "../ignition/parameters.json",
      ),
    },
  );

  const generatedDir = path.resolve(import.meta.dirname, "../../generated");

  await exportDeploymentArtifacts({
    generatedDir,
    deploymentId,
    chainId,
    networkName: connection.networkName,
    contracts: [
      {
        exportName: "membershipPass",
        artifactName: "MembershipPass",
        address: membershipPass.address,
      },
    ],
  });

  console.log("Deployment complete");
  console.log(`Network:                ${connection.networkName}`);
  console.log(`Chain ID:               ${chainId}`);
  console.log(`Deployment ID:          ${deploymentId}`);
  console.log(`MembershipPass address: ${membershipPass.address}`);
  console.log(`Exported files to:      ${generatedDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
