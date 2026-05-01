import React from "react";
import { Box, Typography } from "@mui/material";
import { HoverableIcon } from "components/hoverableIcon/HoverableIcon";
import {
  CenteringWrapper,
  ContributedWrapper,
  CredentialsWrapper,
  FooterLink,
  FooterTextBoxLeft,
  FooterTextBoxRight,
  FooterWrapper,
  Separator,
  SocialsContent,
  SocialsWrapper,
} from "./styled";
import telegram from "assets/icons/telegram.svg";
import telegramHovered from "assets/icons/telegram-hover.svg";
import github from "assets/icons/github.svg";
import githubHovered from "assets/icons/github-hover.svg";
import twitter from "assets/icons/twitter.svg";
import twitterHovered from "assets/icons/twitter-hover.svg";
import { Outlet } from "react-router-dom";
import { useNetwork } from "../../lib/hooks/useNetwork";

export const Footer = () => {
  const { network } = useNetwork();
  const isTestnet = network === "testnet";
  const switchNetworkText = isTestnet ? "Switch to Mainnet" : "Switch to Testnet";
  const switchNetworkURL = isTestnet ? "/" : "/?testnet=true";

  return (
    <FooterWrapper>
      <SocialsWrapper>
        <Box />
        <SocialsContent>
          <HoverableIcon
            iconUrl={telegram}
            hoveredIconUrl={telegramHovered}
            link="https://t.me/iceblockchain"
          />
          <HoverableIcon
            iconUrl={twitter}
            hoveredIconUrl={twitterHovered}
            link="https://x.com/ice_blockchain"
          />
          <HoverableIcon
            iconUrl={github}
            hoveredIconUrl={githubHovered}
            link="https://github.com/professorblock/ion-minter"
          />
        </SocialsContent>
      </SocialsWrapper>
      <Separator />
      <CredentialsWrapper>
        <FooterTextBoxLeft>
          <Typography variant="body2">
            © {new Date().getFullYear()}{" "}
            <FooterLink
              href="https://ionhub.io"
              target="_blank"
              sx={{ color: "#6236E7", fontWeight: 600 }}>
              ION Hub
            </FooterLink>
          </Typography>
        </FooterTextBoxLeft>
        <ContributedWrapper>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            A community platform for{" "}
            <FooterLink
              href="https://ice.io"
              target="_blank"
              sx={{ color: "#6236E7", fontWeight: 600 }}>
              Ice Open Network
            </FooterLink>
          </Typography>
        </ContributedWrapper>
        <FooterTextBoxRight>
          <FooterLink href={switchNetworkURL}>
            <Typography variant="body2">{switchNetworkText}</Typography>
          </FooterLink>
        </FooterTextBoxRight>
      </CredentialsWrapper>
      <Outlet />
    </FooterWrapper>
  );
};
