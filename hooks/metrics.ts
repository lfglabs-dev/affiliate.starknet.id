import { useContractRead } from "@starknet-react/core";
import { RevenueResponse, CountResponse } from "../types/metrics/types";
import { useReferralContract } from "./contracts";
import { fetchApi, methods } from "./fetchApi";
import { useQuery } from "@tanstack/react-query";
import { Abi } from "starknet";

interface UseGetMetricsDataProps {
  sponsor: string;
  since_date: string; // timestamps in seconds
  spacing: string; // in seconds
}

interface UseGetClicksDataProps {
  sponsor: string;
  since_day: string; // timestamp in seconds
  spacing: string; // in seconds
}

export const useGetRevenue = ({
  sponsor,
  since_date,
  spacing,
}: UseGetMetricsDataProps) => {
  const uri = "referral/revenue";

  const query = useQuery<RevenueResponse, Error>({
    queryKey: [uri, sponsor, since_date, spacing],
    queryFn: async (): Promise<RevenueResponse> => {
      return fetchApi({
        uri: `${uri}?sponsor=${sponsor}&since_date=${since_date}&spacing=${spacing}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, revenueArray: query.data?.revenues };
};

export const useGetSalesCount = ({
  sponsor,
  since_date,
  spacing,
}: UseGetMetricsDataProps) => {
  const uri = "referral/sales_count";

  const query = useQuery<CountResponse, Error>({
    queryKey: [uri, sponsor, since_date, spacing],
    queryFn: async (): Promise<CountResponse> => {
      return fetchApi({
        uri: `${uri}?sponsor=${sponsor}&since_date=${since_date}&spacing=${spacing}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, salesCount: query.data?.counts };
};

export const useGetClicks = ({
  sponsor,
  since_day,
  spacing,
}: UseGetClicksDataProps) => {
  const uri = "referral/click_count";

  const query = useQuery<CountResponse, Error>({
    queryKey: [uri, sponsor, since_day, spacing],
    queryFn: async (): Promise<CountResponse> => {
      return fetchApi({
        uri: `${uri}?sponsor=${sponsor}&since_day=${since_day}&spacing=${spacing}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, clicksCount: query.data?.counts };
};

type RemainingBalanceData = {
  balance?: BigInt;
  error?: string;
};

export const useRemainingBalance = (address: string): RemainingBalanceData => {
  const { contract } = useReferralContract();

  const { data, error } = useContractRead({
    address: contract?.address as string,
    abi: contract?.abi as Abi,
    functionName: "get_balance",
    args: [address],
  });
  return { balance: data as any, error: error as string };
};
