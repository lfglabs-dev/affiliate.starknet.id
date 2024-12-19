type IconProps = {
  color?: string;
  width: string;
};

type Identity = {
  addr: string;
  domain: string;
  domain_expiry: number | null;
  is_owner_main: boolean;
  error?: string;
};

type FullId = {
  id: string;
  domain: string;
  domain_expiry: number | null;
};

type ErrorRequestData = {
  status: Status;
  error: string;
};

type Status = "success" | "error";
type DomainKind = "braavos" | "root" | "subdomain" | "none";
type Context = { children: ReactNode };
type ScreenState = "mint" | "loading" | "success" | "error";

type PublicMetrics = {
  followers_count: number;
  following_count: number;
  tweet_count: number;
  listed_count: number;
};

type Member = {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  description: string;
  public_metrics: PublicMetrics;
};

type OverviewAnalytics = {
  value: string;
  differenceInPercent: number;
};

type ChartData = {
  name: string;
  data: number[];
};

type NotificationType {
  TRANSACTION = "TRANSACTION",
}
