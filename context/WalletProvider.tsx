import React, { createContext, useContext, useState, useEffect } from "react";
import {
  useProvider,
  useAccount,
  useConnect,
  Connector,
} from "@starknet-react/core";
import { useDisplayName } from "../hooks/displayName";
import { constants, StarkProfile } from "starknet";
import { StarknetIdJsContext } from "./StarknetIdJsProvider";

interface WalletContextType {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  lastConnector: Connector | null;
  setLastConnector: React.Dispatch<React.SetStateAction<Connector | null>>;
  hasWallet: boolean;
  showWallet: boolean;
  setShowWallet: React.Dispatch<React.SetStateAction<boolean>>;
  connectWallet: (connector: Connector) => Promise<void>;
  setShowConnectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWrongNetwork: React.Dispatch<React.SetStateAction<boolean>>;
  txLoading: number;
  setTxLoading: React.Dispatch<React.SetStateAction<number>>;
  domainOrAddress: string;
  profile?: {
    profilePicture?: string;
  };
  isWrongNetwork: boolean;
}
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletConnectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { connectAsync, connectors, connector } = useConnect();
  const { address } = useAccount();

  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "testnet" : "mainnet";
  const { provider } = useProvider();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastConnector, setLastConnector] = useState<Connector | null>(null);
  const [txLoading, setTxLoading] = useState<number>(0);
  const domainOrAddress = useDisplayName(address ?? "");
  const [profile, setProfile] = useState<StarkProfile | undefined>(undefined);
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const [hasWallet, setShowConnectModal] = useState<boolean>(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const { starknetIdNavigator } = useContext(StarknetIdJsContext);

  useEffect(() => {
    // to handle autoconnect starknet-react adds connector id in local storage
    // if there is no value stored, we show the wallet modal
    if (!localStorage.getItem("SID-lastUsedConnector")) {
      setShowConnectModal(true);
    } else {
      let connectorId = localStorage.getItem("SID-lastUsedConnector");
      const connector = connectors.find((c) => c.id === connectorId);
      setLastConnector(connector || null);
    }
  }, []);

  useEffect(() => {
    address ? setIsConnected(true) : setIsConnected(false);
  }, [address]);

  useEffect(() => {
    if (!isConnected) return;

    provider.getChainId().then((chainId) => {
      const isWrongNetwork =
        (chainId === constants.StarknetChainId.SN_SEPOLIA &&
          network === "mainnet") ||
        (chainId === constants.StarknetChainId.SN_MAIN &&
          network === "testnet");
      setIsWrongNetwork(isWrongNetwork);
    });
  }, [provider, network, isConnected]);

  useEffect(() => {
    if (starknetIdNavigator !== null && address !== undefined) {
      starknetIdNavigator.getProfileData(address).then(setProfile);
    }
  }, [address, starknetIdNavigator]);

  useEffect(() => {
    if (starknetIdNavigator !== null && address !== undefined) {
      starknetIdNavigator.getProfileData(address).then(setProfile);
    }
  }, [address, starknetIdNavigator]);

  const connectWallet = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
      localStorage.setItem("SID-connectedWallet", connector.id);
      localStorage.setItem("SID-lastUsedConnector", connector.id);
    } catch (e) {
      // Restart the connection if there is an error except if the user has rejected the connection
      console.error(e);
      const error = e as Error;
      if (error.name !== "UserRejectedRequestError") connectWallet(connector);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        lastConnector,
        showWallet,
        setIsConnected,
        setShowWallet,
        connectWallet,
        setShowConnectModal,
        setLastConnector,
        setTxLoading,
        setIsWrongNetwork,
        txLoading,
        hasWallet,
        domainOrAddress,
        profile,
        isWrongNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useConnectWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
