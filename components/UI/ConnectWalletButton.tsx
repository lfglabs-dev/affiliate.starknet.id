import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "./button";
import ProfilFilledIcon from "./iconsComponents/icons/profilFilledIcon";
import ArrowDownIcon from "./iconsComponents/icons/arrowDownIcon";
import connectStyles from "../../styles/components/walletConnect.module.css";
import { useTheme } from "@mui/material";
import { useConnectWallet } from "../../context/WalletProvider";
import { getConnectorIcon } from "../../utils/connectorWrapper";

const ConnectWalletButton: React.FC = () => {
  const theme = useTheme();

  const {
    isConnected,
    lastConnector,
    setShowWallet,
    connectWallet,
    setShowConnectModal,
    txLoading,
    domainOrAddress,
    profile,
  } = useConnectWallet();

  return (
    <div className="mx-5 text-beige">
      <Button
        onClick={
          isConnected
            ? () => setShowWallet(true)
            : lastConnector
            ? () => connectWallet(lastConnector)
            : () => setShowConnectModal(true)
        }
        variation={isConnected ? "white" : "primary"}
        radius="8px"
      >
        {isConnected ? (
          <>
            {txLoading > 0 ? (
              <div className="flex items-center justify-center">
                <p className="mr-3">{txLoading} on hold</p>
                <CircularProgress
                  sx={{ color: theme.palette.secondary.main }}
                  size={25}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="mr-3">{domainOrAddress}</p>
                {profile?.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    width="32"
                    height="32"
                    className="rounded-full"
                  />
                ) : (
                  <ProfilFilledIcon
                    width="24"
                    color={theme.palette.secondary.main}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <div className={connectStyles.connectBtn}>
            {lastConnector && (
              <img
                src={getConnectorIcon(lastConnector.id)}
                className={connectStyles.btnIcon}
              />
            )}
            <p>connect</p>
            {lastConnector && (
              <div
                className={connectStyles.arrowDown}
                onClick={(e) => {
                  setShowConnectModal(true);
                  e.stopPropagation();
                }}
              >
                <ArrowDownIcon
                  width="18"
                  color="#FFF"
                  className={connectStyles.arrowDownIcon}
                />
              </div>
            )}
          </div>
        )}
      </Button>
    </div>
  );
};

export default ConnectWalletButton;
