import { useContract } from "@starknet-react/core";
import naming_abi from "../abi/starknet/naming_abi.json";
import referral_abi from "../abi/starknet/referral_abi.sierra.json";
import { Abi } from "starknet";

export function useNamingContract() {
  return useContract({
    abi: naming_abi as Abi,
    address: process.env.NEXT_PUBLIC_NAMING_CONTRACT as `0x${string}`,
  });
}

export function useReferralContract() {
  return useContract({
    abi: referral_abi.abi as Abi,
    address: process.env.NEXT_PUBLIC_REFERRAL_CONTRACT as `0x${string}`,
  });
}
