"use client";

import { useCallback, useEffect, useState } from "react";
import { BrowserProvider, type Contract } from "ethers";
import {
  membershipPassDeployment,
  type Address,
} from "@membership-pass/contracts";
import { createMembershipPassContract } from "@/features/membership/services/membership-pass-client";
import { getEthereumProvider } from "@/shared/wallet/ethereum";

const HARDHAT_CHAIN = {
  chainId: `0x${membershipPassDeployment.chainId.toString(16)}`,
  chainName: "Hardhat Local",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["http://127.0.0.1:8545"],
};

export function useWalletSession() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<Address | "">("");
  const [connected, setConnected] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState("");
  const [walletStatus, setWalletStatus] = useState("Ready");

  const ensureCorrectChain = useCallback(async () => {
    const ethereum = getEthereumProvider();

    if (!ethereum) {
      throw new Error("MetaMask not found");
    }

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: HARDHAT_CHAIN.chainId }],
      });
    } catch {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [HARDHAT_CHAIN],
      });
    }
  }, []);

  const connectWallet = useCallback(async () => {
    const ethereum = getEthereumProvider();

    if (!ethereum) {
      setWalletError("MetaMask not found. Please install MetaMask first.");
      return;
    }

    try {
      setWalletLoading(true);
      setWalletError("");
      setWalletStatus("Connecting wallet...");

      await ensureCorrectChain();

      const nextProvider = new BrowserProvider(ethereum);
      const signer = await nextProvider.getSigner();
      const nextAccount = (await signer.getAddress()) as Address;

      setProvider(nextProvider);
      setContract(await createMembershipPassContract(nextProvider, nextAccount));
      setAccount(nextAccount);
      setConnected(true);
      setWalletStatus("Wallet connected");
    } catch (error) {
      console.error(error);
      setWalletError(
        error instanceof Error ? error.message : "Failed to connect wallet",
      );
      setWalletStatus("Connection failed");
    } finally {
      setWalletLoading(false);
    }
  }, [ensureCorrectChain]);

  useEffect(() => {
    const ethereum = getEthereumProvider();

    if (!ethereum) {
      return;
    }

    const handleAccountsChanged = () => window.location.reload();
    const handleChainChanged = () => window.location.reload();

    ethereum.on?.("accountsChanged", handleAccountsChanged);
    ethereum.on?.("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
      ethereum.removeListener?.("chainChanged", handleChainChanged);
    };
  }, []);

  return {
    provider,
    contract,
    account,
    connected,
    walletLoading,
    walletError,
    walletStatus,
    connectWallet,
  };
}
