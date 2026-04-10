import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

import { targetChainId } from "@/src/lib/contracts";

export const localhostChain = defineChain({
  id: targetChainId,
  name: "Localhost",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Local Explorer",
      url: "http://127.0.0.1:8545",
    },
  },
  testnet: true,
});

export const wagmiConfig = createConfig({
  chains: [localhostChain],
  connectors: [injected()],
  transports: {
    [localhostChain.id]: http("http://127.0.0.1:8545"),
  },
});
