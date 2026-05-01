import { useState } from "react";
import { Address } from "ton";
import { Box, Fade, Link, Typography } from "@mui/material";
import { jettonDeployController, JettonDeployParams } from "lib/deploy-controller";
import WalletConnection from "services/wallet-connection";
import { createDeployParams } from "lib/utils";
import { ContractDeployer } from "lib/contract-deployer";
import { Link as ReactRouterLink } from "react-router-dom";
import { ROUTES } from "consts";
import useNotification from "hooks/useNotification";
import { FormWrapper, ScreenHeading, StyledDescription, SubHeadingWrapper } from "./styles";
import { Screen, ScreenContent } from "components/Screen";
import analytics, { AnalyticsAction, AnalyticsCategory } from "services/analytics";
import { getUrlParam, toDecimalsBN } from "utils";
import { offchainFormSpec, onchainFormSpec } from "./data";
import { Form } from "components/form";
import { GithubButton } from "pages/deployer/githubButton";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { useTonAddress, useTonConnectUI } from "@ion-gateway/ui-react";

const DEFAULT_DECIMALS = 9;
const isOffchainInternal = getUrlParam("offchainINTERNAL") !== null;
const formSpec = isOffchainInternal ? offchainFormSpec : onchainFormSpec;

async function fetchDecimalsOffchain(url: string): Promise<{ decimals?: string }> {
  const res = await fetch(url);
  return res.json();
}

const STATS = [
  "30M+ Users",
  "ION Mainnet Live",
  "0 Gas for Regular TXs",
  "Jetton Standard",
  "Open Source",
  "100% On-Chain",
  "30M+ Users",
  "ION Mainnet Live",
  "0 Gas for Regular TXs",
  "Jetton Standard",
  "Open Source",
  "100% On-Chain",
];

function DeployerPage() {
  const { showNotification } = useNotification();
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigatePreserveQuery();

  async function deployContract(data: any) {
    if (!walletAddress || !tonConnectUI) throw new Error("Wallet not connected");

    let decimals = data.decimals;
    if (data.offchainUri) {
      const res = await fetchDecimalsOffchain(
        data.offchainUri.replace("ipfs://", "https://ipfs.io/ipfs/"),
      );
      decimals = res.decimals;
    }

    const params: JettonDeployParams = {
      owner: Address.parse(walletAddress),
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        image: data.tokenImage,
        description: data.description,
        decimals: parseInt(decimals).toFixed(0),
      },
      offchainUri: data.offchainUri,
      amountToMint: toDecimalsBN(data.mintAmount, decimals ?? DEFAULT_DECIMALS),
    };

    setIsLoading(true);
    const deployParams = createDeployParams(params, data.offchainUri);
    const contractAddress = new ContractDeployer().addressForContract(deployParams);
    const isDeployed = await WalletConnection.isContractDeployed(contractAddress);

    if (isDeployed) {
      showNotification(
        <>
          Contract already deployed,{" "}
          <ReactRouterLink to={`${ROUTES.jetton}/${Address.normalize(contractAddress)}/`}>
            view it here
          </ReactRouterLink>
        </>,
        "warning",
      );
      setIsLoading(false);
      return;
    }

    try {
      const result = await jettonDeployController.createJetton(params, tonConnectUI, walletAddress);
      analytics.sendEvent(
        AnalyticsCategory.DEPLOYER_PAGE,
        AnalyticsAction.DEPLOY,
        contractAddress.toFriendly(),
      );
      navigate(`${ROUTES.jetton}/${Address.normalize(result)}`);
    } catch (err) {
      if (err instanceof Error) showNotification(<>{err.message}</>, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            {/* ── Ambient hero glow ── */}
            <Box sx={{ position: "relative", zIndex: 1, mt: 8, mb: 6, textAlign: "center" }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(123,87,255,0.10)",
                  border: "1px solid rgba(123,87,255,0.22)",
                  borderRadius: 999,
                  px: 2,
                  py: 0.8,
                  mb: 3,
                }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#2BD98F",
                    boxShadow: "0 0 12px rgba(43,217,143,0.7)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#A487FF",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                  Live on ION Mainnet
                </Typography>
              </Box>

              <ScreenHeading variant="h1">
                Launch Your Token
                <br />
                on <span className="g">ION.</span>
              </ScreenHeading>

              <Typography
                sx={{
                  mt: 2.5,
                  maxWidth: 760,
                  mx: "auto",
                  color: "rgba(245,242,255,0.62)",
                  fontSize: 18,
                  lineHeight: "32px",
                  fontWeight: 400,
                }}>
                Premium token launch infrastructure for Ice Open Network — designed for creators,
                communities, and ecosystem builders.
              </Typography>
            </Box>
            {/* ── Stats ticker ── */}
            <Box
              sx={{
                my: 4,
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 80,
                  zIndex: 2,
                },
                "&::before": {
                  left: 0,
                  background: "linear-gradient(90deg, #07080F, transparent)",
                },
                "&::after": {
                  right: 0,
                  background: "linear-gradient(-90deg, #07080F, transparent)",
                },
              }}>
              <Box
                sx={{
                  display: "inline-flex",
                  gap: 4,
                  animation: "ticker 22s linear infinite",
                  whiteSpace: "nowrap",
                }}>
                {STATS.map((s, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: i % 3 === 0 ? "#A78BFA" : i % 3 === 1 ? "#E879F9" : "#34D399",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(238,238,248,0.5)",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "0.04em",
                      }}>
                      {s}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── Form + Info cards ── */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <FormWrapper sx={{ maxWidth: 1200, mx: "auto" }}>
                <SubHeadingWrapper>
                  <Form
                    isLoading={isLoading}
                    submitText="Deploy Token"
                    onSubmit={deployContract}
                    inputs={formSpec}
                  />
                </SubHeadingWrapper>
                <Box sx={{ flex: 4 }}>
                  <Description />
                </Box>
              </FormWrapper>
            </Box>
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { DeployerPage };

function Description() {
  return (
    <StyledDescription sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: 40,
          px: 1.5,
          py: 0.6,
          mb: 2.5,
        }}>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#34D399",
            boxShadow: "0 0 8px rgba(52,211,153,0.8)",
          }}
        />
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: "#A78BFA",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
          ION Mainnet Live
        </Typography>
      </Box>

      <Typography
        variant="h5"
        mb={1.5}
        sx={{
          color: "#EEEEF8",
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "Inter, sans-serif",
        }}>
        Token Launch · ION Hub
      </Typography>

      <Typography
        mb={2.5}
        sx={{
          fontWeight: 500,
          fontSize: 14,
          fontFamily: "Inter, sans-serif",
          background: "linear-gradient(135deg, #A78BFA, #E879F9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: "22px",
        }}>
        The first community token launchpad for Ice Open Network — the blockchain built for 30M+
        real users.
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 14,
          color: "rgba(238,238,248,0.6)",
          fontFamily: "Inter, sans-serif",
          lineHeight: "24px",
          "& a": { textDecoration: "none", fontWeight: 600, color: "#A78BFA" },
          "& a:hover": { color: "#C4B5FD" },
          "& strong": { color: "#EEEEF8", fontWeight: 600 },
        }}>
        Tokens on ION use the{" "}
        <Link
          target="_blank"
          href="https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md">
          Jetton standard
        </Link>{" "}
        — battle-tested and deployed across billions in on-chain value. You need at least{" "}
        <strong>0.25 ION</strong> for deployment fees.
        <Box component="span" sx={{ display: "block", height: 16 }} />
        All contracts and frontend code are{" "}
        <Link target="_blank" href="https://github.com/professorblock/ion-minter">
          open source on GitHub
        </Link>
        . Contracts are immutable. No admin keys. Your token is 100% yours.
      </Typography>

      {/* Modules roadmap */}
      <Box mt={3} pt={2.5} sx={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(238,238,248,0.3)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
            mb: 1.5,
          }}>
          ION Hub · Roadmap
        </Typography>
        {[
          { label: "Token Launch", status: "Live", color: "#34D399", glow: "rgba(52,211,153,0.3)" },
          {
            label: "Token Explorer",
            status: "Soon",
            color: "#A78BFA",
            glow: "rgba(167,139,250,0.2)",
          },
          {
            label: "Liquidity Tools",
            status: "Soon",
            color: "#A78BFA",
            glow: "rgba(167,139,250,0.2)",
          },
          {
            label: "Community DEX",
            status: "Roadmap",
            color: "rgba(238,238,248,0.25)",
            glow: "none",
          },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 0.9,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(238,238,248,0.75)",
                fontFamily: "Inter, sans-serif",
              }}>
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: item.color,
                fontFamily: "Inter, sans-serif",
                textShadow: item.glow !== "none" ? `0 0 8px ${item.glow}` : "none",
              }}>
              {item.status}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box mt={2.5}>
        <GithubButton />
      </Box>
    </StyledDescription>
  );
}
