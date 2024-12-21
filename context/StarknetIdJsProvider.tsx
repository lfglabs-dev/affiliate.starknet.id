"use client";

import React, { FunctionComponent, createContext, useMemo } from "react";
import { RpcProvider, constants } from "starknet";
import { StarknetIdNavigator } from "starknetid.js";

type StarknetIdJsConfig = {
  starknetIdNavigator: StarknetIdNavigator | null;
};

export const StarknetIdJsContext = createContext<StarknetIdJsConfig>({
  starknetIdNavigator: null,
});

export const StarknetIdJsProvider: FunctionComponent<Context> = ({
  children,
}) => {
  const provider = useMemo(() => {
    return new RpcProvider({
      nodeUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    });
  }, []);

  const starknetIdNavigator = useMemo(() => {
    return new StarknetIdNavigator(
      provider,
      process.env.NEXT_PUBLIC_IS_TESTNET === "true"
        ? constants.StarknetChainId.SN_SEPOLIA
        : constants.StarknetChainId.SN_MAIN
    );
  }, [provider]);

  const contextValues = useMemo(() => {
    return {
      starknetIdNavigator,
    };
  }, [starknetIdNavigator]);

  return (
    <StarknetIdJsContext.Provider value={contextValues}>
      {children}
    </StarknetIdJsContext.Provider>
  );
};
