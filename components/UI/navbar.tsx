import Link from "next/link";
import React, { useState, FunctionComponent } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import styles from "../../styles/components/navbar.module.css";
import Button from "./button";
import { useConnect, useDisconnect } from "@starknet-react/core";
import Wallets from "./wallets";
import ModalMessage from "./modalMessage";
import { useMediaQuery } from "@mui/material";
import ModalWallet from "./modalWallet";
import ConnectWalletButton from "./ConnectWalletButton";
import { useConnectWallet } from "../../context/WalletProvider";

const Navbar: FunctionComponent = () => {
  const [nav, setNav] = useState<boolean>(false);

  const {
    isConnected,
    setShowWallet,
    connectWallet,
    setIsConnected,
    setShowConnectModal,
    setIsWrongNetwork,
    hasWallet,
    isWrongNetwork,
    setTxLoading,
    showWallet,
    domainOrAddress,
  } = useConnectWallet();

  const isMobile = useMediaQuery("(max-width:425px)");
  const green = "#19AA6E";
  const brown = "#402d28";
  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "testnet" : "mainnet";
  const { connectors } = useConnect();
  const { disconnect } = useDisconnect();

  function disconnectByClick(): void {
    disconnect();
    setIsConnected(false);
    setIsWrongNetwork(false);
    setShowConnectModal(false);
    setShowWallet(false);
    localStorage.removeItem("SID-connectedWallet");
  }

  function handleNav(): void {
    setNav(!nav);
  }

  function onTopButtonClick(): void {
    if (!isConnected) {
      setShowConnectModal(true);
    } else {
      setShowWallet(true);
    }
  }

  function topButtonText(): string | undefined {
    const textToReturn = isConnected ? domainOrAddress : "connect";

    return textToReturn;
  }

  return (
    <>
      <div className={"fixed w-full z-20 bg-background-nav top-0"}>
        <div className={styles.navbarContainer}>
          <div className="ml-4">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <img
                className={styles.starknetIdLogo}
                src="/visuals/MbLogo.svg"
                alt="Starknet.id Logo"
                width={isMobile ? 40 : 40}
                height={isMobile ? 40 : 90}
              />
              <p
                className={`${styles.starknetId} text-[#454545] text-lg  tracking-wide whitespace-nowrap text-nowrap leading-10 font-quickZap `}
              >
                StarkNet ID
              </p>
            </Link>
          </div>
          <div>
            <ul className="items-center hidden lg:flex">
              <Link href="/">
                <li className={styles.menuItem}>Affiliate Space</li>
              </Link>
              {/* <Link href="/analytics">
                <li className={styles.menuItem}>Analytics</li>
              </Link> */}
              <ConnectWalletButton />
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
              <div className="flex items-center justify-between w-full">
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
              <div className="my-4 border-b border-tertiary-300">
                <p className="w-[85%] lg:w-[90%] py-4">
                  Own your on-chain identity
                </p>
              </div>
              <div className="flex flex-col py-4">
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
              <p className="tracking-widest uppercase white">
                Claim your starknet identity
              </p>
              <div className="flex items-center my-4 w-full sm:w-[80%]">
                <div className="p-3 duration-300 ease-in rounded-full cursor-pointer shadow-gray-400 hover:scale-105">
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
          <div className="flex flex-col items-center justify-center mt-3 text-center">
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
        closeWallet={() => setShowConnectModal(false)}
        open={Boolean(hasWallet && !isWrongNetwork)}
        connectors={connectors}
        connectWallet={connectWallet}
      />
    </>
  );
};

export default Navbar;
