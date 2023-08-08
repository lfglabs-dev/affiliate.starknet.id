import { Period } from "../types/metrics/types";
import { fetchApi, methods } from "./fetchApi";
import { useQuery } from "@tanstack/react-query";

interface UseGetMetricsDataProps {
  sponsor: string;
  since_date: string; // in timestamp
  spacing: string; // in seconds
}

export const useGetDomains = ({
  sponsor,
  since_date,
  spacing,
}: UseGetMetricsDataProps) => {
  const uri = "referral/revenue";

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, sponsor, since_date, spacing],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?sponsor=${sponsor}&since_date=${since_date}&spacing=${spacing}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainsCreated: query.data?.count };
};
