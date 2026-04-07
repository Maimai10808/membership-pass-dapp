import { isAddress } from "ethers";

export function isValidAddress(address: string) {
  return isAddress(address.trim());
}

export function shortAddress(address: string) {
  if (!address) return "-";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
