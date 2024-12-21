import { useReadContract } from "@starknet-react/core";
import { useReferralContract } from "./contracts";
import { Abi } from "starknet";

type RemainingBalanceData = {
  balance?: BigInt;
  error?: string;
};

export const useRemainingBalance = (address: string): RemainingBalanceData => {
  const { contract } = useReferralContract();
  const { data, error } = useReadContract({
    address: contract?.address as `0x${string}`,
    abi: contract?.abi as Abi,
    functionName: "get_balance",
    args: [address],
  });
  return { balance: data as any, error: error as any };
};
