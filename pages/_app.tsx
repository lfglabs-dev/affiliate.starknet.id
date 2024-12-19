import React, { ReactElement } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/UI/navbar";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { InjectedConnector, jsonRpcProvider, StarknetConfig } from "@starknet-react/core";
import { Analytics } from "@vercel/analytics/react";
import { StarknetIdJsProvider } from "../context/StarknetIdJsProvider";
import posthog from "posthog-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chain, sepolia, mainnet } from "@starknet-react/chains";

// Wallet Connectors
const connectors = [
  new InjectedConnector({ options: { id: "argentX" } }),
  new InjectedConnector({ options: { id: "braavos" } }),
];

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: "https://app.posthog.com",
    session_recording: {
      recordCrossOriginIframes: true,
    },
  });
  (window as any).posthog = posthog;
}

function MyApp({ Component, pageProps }: AppProps) {
  const chains = [mainnet, sepolia];
  const providers = jsonRpcProvider({
    rpc: (_chain: Chain) => ({
      nodeUrl: process.env.NEXT_PUBLIC_RPC_URL as string,
    }),
  });
  const queryClient = new QueryClient();
  const AnyComponent = Component as any;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StarknetConfig
          connectors={connectors}
          autoConnect
          chains={chains}
          provider={providers}
        >
          <StarknetIdJsProvider>
            <ThemeProvider theme={theme}>
              <Head>
                <title>affiliate.starknet.id</title>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
              </Head>
              <Navbar />
              <AnyComponent {...pageProps} />
            </ThemeProvider>
            <Analytics />
          </StarknetIdJsProvider>
        </StarknetConfig>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
