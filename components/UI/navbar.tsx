import Link from "next/link";
import React, { useState, useEffect, FunctionComponent, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import styles from "../../styles/components/navbar.module.css";
import Button from "./button";
import { useProvider, useAccount, useConnect, useDisconnect, Connector } from "@starknet-react/core";
import Wallets from "./wallets";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModalMessage from "./modalMessage";
import { useDisplayName } from "../../hooks/displayName";
import { CircularProgress } from "@mui/material";
import ModalWallet from "./modalWallet";
import { useRouter } from "next/router";
import { constants, StarkProfile } from "starknet";
import { StarknetIdJsContext } from "../../context/StarknetIdJsProvider";

const Navbar: FunctionComponent = () => {
  const router = useRouter();
  const [nav, setNav] = useState<boolean>(false);
  const [hasWallet, setShowConnetModal] = useState<boolean>(false);
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const { provider } = useProvider();
  const domainOrAddress = useDisplayName(address ?? "");
  const green = "#19AA6E";
  const brown = "#402d28";
  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "testnet" : "mainnet";
  const { connectAsync, connectors, connector } = useConnect();
  const { disconnect } = useDisconnect();
  const [txLoading, setTxLoading] = useState<number>(0);
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const { starknetIdNavigator } = useContext(StarknetIdJsContext);
  const [profile, setProfile] = useState<StarkProfile | undefined>(undefined);
  const [lastConnector, setLastConnector] = useState<Connector | null>(null);

  useEffect(() => {
    // to handle autoconnect starknet-react adds connector id in local storage
    // if there is no value stored, we show the wallet modal
    if (!localStorage.getItem("SID-lastUsedConnector")) {
      setShowConnetModal(true);
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

  function disconnectByClick(): void {
    disconnect();
    setIsConnected(false);
    setIsWrongNetwork(false);
    setShowConnetModal(false);
    setShowWallet(false);
    localStorage.removeItem("SID-connectedWallet");
  }

  function handleNav(): void {
    setNav(!nav);
  }

  function onTopButtonClick(): void {
    if (!isConnected) {
      setShowConnetModal(true);
    } else {
      setShowWallet(true);
    }
  }

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

  function topButtonText(): string | undefined {
    const textToReturn = isConnected ? domainOrAddress : "connect";

    return textToReturn;
  }

  return (
    <>
      <div className={"fixed w-full z-[1] bg-background"}>
        <div className={styles.navbarContainer}>
          <div className="ml-4">
            <Link href="/" className="cursor-pointer">
              <img
                className="cursor-pointer"
                src="/visuals/StarknetIdLogo.svg"
                alt="Starknet.id Logo"
                width={90}
                height={90}
              />
            </Link>
          </div>
          <div>
            <ul className="hidden lg:flex items-center">
              <Link href="/">
                <li className={styles.menuItem}>Affiliate Space</li>
              </Link>
              {/* <Link href="/analytics">
                <li className={styles.menuItem}>Analytics</li>
              </Link> */}
              <div className="text-beige ml-10 mr-5">
                <Button
                  onClick={
                    isConnected
                      ? () => setShowWallet(true)
                      : lastConnector
                      ? () => connectWallet(lastConnector)
                      : () => setShowConnetModal(true)
                  }
                  variation={isConnected ? "white" : "primary"}
                >
                  {isConnected ? (
                    <>
                      {txLoading > 0 ? (
                        <div className="flex justify-center items-center">
                          <p className="mr-3">{txLoading} on hold</p>
                          <CircularProgress
                            sx={{
                              color: "white",
                            }}
                            size={25}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <p className="mr-3">{domainOrAddress}</p>
                          {profile?.profilePicture ? (
                            <img
                              src={profile?.profilePicture}
                              width="32"
                              height="32"
                              className="rounded-full"
                            />
                          ) : (
                            <AccountCircleIcon />
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    "connect"
                  )}
                </Button>
              </div>
            </ul>
            <div onClick={handleNav} className="lg:hidden">
              <AiOutlineMenu color={brown} size={25} className="mr-3" />
            </div>
          </div>
        </div>

        <div
          className={
            nav
              ? "lg:hidden fixed left-0 top-0 w-full h-screen bg-black/10"
              : ""
          }
        >
          <div
            className={
              nav
                ? "fixed left-0 top-0 w-[75%] sm:w-[60%] lg:w-[45%] h-screen bg-background p-10 ease-in duration-500 flex justify-between flex-col"
                : "fixed left-[-100%] top-0 p-10 ease-in h-screen flex justify-between flex-col"
            }
          >
            <div>
              <div className="flex w-full items-center justify-between">
                <div className="">
                  <Link href="/">
                    <img
                      src="/visuals/starknetIdLongLogo.webp"
                      alt="Starknet.id Logo"
                      width={250}
                      height={100}
                    />
                  </Link>
                </div>

                <div
                  onClick={handleNav}
                  className="rounded-full cursor-pointer"
                >
                  <AiOutlineClose color={brown} />
                </div>
              </div>
              <div className="border-b border-tertiary-300 my-4">
                <p className="w-[85%] lg:w-[90%] py-4">
                  Own your on-chain identity
                </p>
              </div>
              <div className="py-4 flex flex-col">
                <ul className="uppercase">
                  <Link href="/">
                    <li
                      onClick={() => setNav(false)}
                      className={styles.menuItemSmall}
                    >
                      Affiliate Space
                    </li>
                  </Link>
                  {/* <Link href="/analytics">
                    <li
                      onClick={() => setNav(false)}
                      className={styles.menuItemSmall}
                    >
                      Analytics
                    </li>
                  </Link> */}
                </ul>
              </div>
            </div>

            <div>
              <p className="uppercase tracking-widest white">
                Claim your starknet identity
              </p>
              <div className="flex items-center my-4 w-full sm:w-[80%]">
                <div className="rounded-full shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <Link href="https://twitter.com/Starknet_id">
                    <FaTwitter size={20} color={green} />
                  </Link>
                </div>
                <div className="text-background">
                  <Button onClick={onTopButtonClick}>{topButtonText()}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalMessage
        open={isWrongNetwork}
        title={"Wrong network"}
        closeModal={() => setIsWrongNetwork(false)}
        message={
          <div className="mt-3 flex flex-col items-center justify-center text-center">
            <p>
              This app only supports Starknet {network}, you have to change your
              network to be able use it.
            </p>
            <div className="mt-3">
              <Button onClick={() => disconnectByClick()}>
                {`Disconnect`}
              </Button>
            </div>
          </div>
        }
      />
      <ModalWallet
        domain={domainOrAddress}
        open={showWallet}
        closeModal={() => setShowWallet(false)}
        disconnectByClick={disconnectByClick}
        setTxLoading={setTxLoading}
      />
      <Wallets
        closeWallet={() => setShowConnetModal(false)}
        open={Boolean(hasWallet && !isWrongNetwork)}
        connectors={connectors}
        connectWallet={connectWallet}
      />
    </>
  );
};

export default Navbar;
