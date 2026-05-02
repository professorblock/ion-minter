import { useState } from "react";
import { Address } from "ton";
import { Box, Button, Fade, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
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
import { TokenDeploymentForm, TokenDeploymentFormValues } from "components/tokenDeploymentForm";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { useTonAddress, useTonConnectUI } from "@ion-gateway/ui-react";

const DEFAULT_DECIMALS = 9;
const isOffchainInternal = getUrlParam("offchainINTERNAL") !== null;

async function fetchDecimalsOffchain(url: string): Promise<{ decimals?: string }> {
  const res = await fetch(url);
  return res.json();
}

const RECENT_ACTIVITY = [
  { label: "Minted", token: "PEPE", time: "2 mins ago", dot: "#34D399" },
  { label: "Minted", token: "DOGE", time: "5 mins ago", dot: "#60A5FA" },
  { label: "Deployed", token: "ION-X", time: "12 mins ago", dot: "#A78BFA" },
];

const HERO_STATS = [
  { value: "30M+", label: "Users" },
  { value: "~0 Gas", label: "Regular TXs" },
  { value: "0.3s", label: "Finality Time" },
  { value: "100%", label: "On-Chain" },
];

const FEATURE_CARDS = [
  {
    icon: <BoltRoundedIcon sx={{ fontSize: 24, color: "#FBBF24" }} />,
    iconBg: "rgba(251,191,36,0.10)",
    title: "Sub-Second Finality",
    description:
      "Experience unparalleled speed. Transactions on ION are confirmed in milliseconds, providing a seamless user experience.",
  },
  {
    icon: <ShieldRoundedIcon sx={{ fontSize: 24, color: "#60A5FA" }} />,
    iconBg: "rgba(96,165,250,0.10)",
    title: "Bank-Grade Security",
    description:
      "Built on robust architecture. Smart contracts are rigorously audited and conform to the strict Jetton standard protocols.",
  },
  {
    icon: <HubRoundedIcon sx={{ fontSize: 24, color: "#A78BFA" }} />,
    iconBg: "rgba(167,139,250,0.10)",
    title: "Open & Composable",
    description:
      "Built on ION's open framework. Compose with identity, storage, and the broader ecosystem out of the box.",
  },
];

function DeployerPage() {
  const { showNotification } = useNotification();
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigatePreserveQuery();

  async function deployContract(data: TokenDeploymentFormValues) {
    if (!walletAddress || !tonConnectUI) throw new Error("Wallet not connected");

    let decimals: string | number = data.decimals;
    if (isOffchainInternal && (data as any).offchainUri) {
      const res = await fetchDecimalsOffchain(
        (data as any).offchainUri.replace("ipfs://", "https://ipfs.io/ipfs/"),
      );
      decimals = res.decimals ?? decimals;
    }

    const params: JettonDeployParams = {
      owner: Address.parse(walletAddress),
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        image: data.tokenImage,
        description: data.description,
        decimals: parseInt(decimals as string).toFixed(0),
      },
      offchainUri: (data as any).offchainUri,
      amountToMint: toDecimalsBN(data.mintAmount, decimals ?? DEFAULT_DECIMALS),
    };

    setIsLoading(true);
    const deployParams = createDeployParams(params, (data as any).offchainUri);
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

  const scrollToForm = () => {
    document.getElementById("token-deployment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box
            sx={{
              position: "relative",
              minHeight: "100vh",
              color: "#fff",
              overflow: "hidden",
              pt: { xs: 4, md: 6 },
              pb: { xs: 8, md: 14 },
            }}>
            {/* ============================================ HERO ============================================ */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 5, md: 10 },
                textAlign: "center",
                px: 2,
              }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(96,165,250,0.08)",
                  border: "1px solid rgba(96,165,250,0.22)",
                  borderRadius: 999,
                  px: 2.25,
                  py: 0.95,
                  mb: { xs: 4, md: 5 },
                  boxShadow: "0 0 24px rgba(96,165,250,0.18)",
                  backdropFilter: "blur(12px)",
                }}>
                <Box
                  className="status-dot"
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#34D399",
                    boxShadow: "0 0 10px rgba(52,211,153,0.9)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#93C5FD",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}>
                  Live on ION Mainnet
                </Typography>
              </Box>

              <ScreenHeading variant="h1">
                Launch Tokens
                <br />
                on <span className="g">ION.</span>
              </ScreenHeading>

              {/* ====== Tagline — capitalized, italic, gradient (catchier) ====== */}
              <Typography
                className="gradient-text"
                sx={{
                  mt: { xs: 2, md: 2.5 },
                  fontSize: { xs: 24, md: 38 },
                  fontWeight: 500,
                  fontStyle: "italic",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.1,
                }}>
                At Lightning Speed.
              </Typography>

              <Typography
                sx={{
                  mt: { xs: 3, md: 4 },
                  maxWidth: 760,
                  mx: "auto",
                  color: "rgba(255,255,255,0.62)",
                  fontSize: { xs: 16, md: 18 },
                  lineHeight: { xs: "27px", md: "30px" },
                  fontWeight: 400,
                }}>
                The industry-leading token generation engine for the{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 600 }}>
                  Ice Open Network
                </Box>
                . Deploy instantly with zero code, zero friction, and near-zero gas.
              </Typography>

              <Box
                sx={{
                  mt: { xs: 4.5, md: 5.5 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.75,
                  flexWrap: "wrap",
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />}
                  onClick={scrollToForm}
                  sx={{ px: 3.5, py: 1.65, fontSize: 15.5, fontWeight: 600 }}>
                  Start Building
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 17 }} />}
                  href="https://ice.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ px: 3.5, py: 1.65, fontSize: 15.5, fontWeight: 500 }}>
                  Explore Network
                </Button>
              </Box>

              <Box
                sx={{
                  mt: { xs: 4, md: 5 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.25,
                  flexWrap: "wrap",
                }}>
                {RECENT_ACTIVITY.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 999,
                      px: 1.6,
                      py: 0.75,
                    }}>
                    <Box
                      className="status-dot"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: item.dot,
                        boxShadow: `0 0 8px ${item.dot}`,
                      }}
                    />
                    <Typography
                      sx={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                      {item.label}:
                    </Typography>
                    <Box
                      sx={{
                        fontFamily: "'SF Mono', Menlo, Monaco, 'Courier New', monospace",
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.92)",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 0.75,
                        px: 0.85,
                        py: 0.2,
                        letterSpacing: "0.02em",
                      }}>
                      {item.token}
                    </Box>
                    <Typography
                      sx={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                      {item.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ============================================ STATS BAR ============================================ */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 6, md: 9 },
                maxWidth: 1100,
                mx: "auto",
                px: { xs: 2, md: 0 },
              }}>
              <Box
                className="glass-card"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                  gap: { xs: 3, md: 0 },
                  py: { xs: 4, md: 5.5 },
                  px: { xs: 3, md: 4 },
                  borderRadius: "20px !important",
                }}>
                {HERO_STATS.map((stat, i) => (
                  <Box
                    key={i}
                    sx={{
                      textAlign: "center",
                      borderRight: {
                        xs: "none",
                        md: i < HERO_STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      },
                    }}>
                    <Typography
                      sx={{
                        fontSize: { xs: 34, md: 50 },
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        color: "#FFFFFF",
                        lineHeight: 1.05,
                      }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 1.25,
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#60A5FA",
                      }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ============================================ TOKEN DEPLOYMENT ============================================ */}
            <Box
              id="token-deployment"
              sx={{ position: "relative", zIndex: 1, mt: { xs: 12, md: 18 } }}>
              <Box sx={{ textAlign: "left", maxWidth: 1280, mx: "auto", px: { xs: 2, md: 0 } }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    background: "rgba(167,139,250,0.10)",
                    border: "1px solid rgba(167,139,250,0.24)",
                    borderRadius: 999,
                    px: 1.85,
                    py: 0.7,
                    mb: 2.25,
                  }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#A78BFA",
                      boxShadow: "0 0 10px rgba(167,139,250,0.7)",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#C4B5FD",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}>
                    Creator Studio
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: 36, md: 52 },
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                  }}>
                  Token Deployment
                </Typography>
                <Typography
                  sx={{
                    mt: 1.75,
                    color: "rgba(255,255,255,0.5)",
                    fontSize: { xs: 15, md: 17 },
                    fontWeight: 400,
                  }}>
                  Simplified Jetton creation with enterprise-grade features.
                </Typography>
              </Box>

              <Box sx={{ mt: { xs: 4, md: 6 } }}>
                <FormWrapper sx={{ maxWidth: 1280, mx: "auto" }}>
                  <SubHeadingWrapper>
                    <TokenDeploymentForm onSubmit={deployContract} isLoading={isLoading} />
                  </SubHeadingWrapper>

                  <Box sx={{ width: { xs: "100%", lg: 380 }, flexShrink: 0 }}>
                    <LaunchSummary />
                  </Box>
                </FormWrapper>
              </Box>
            </Box>

            {/* ============================================ ENTERPRISE GRADE ============================================ */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 12, md: 18 },
                maxWidth: 1280,
                mx: "auto",
                px: { xs: 2, md: 0 },
                textAlign: "center",
              }}>
              <Typography
                sx={{
                  fontSize: { xs: 32, md: 46 },
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}>
                <Box component="span" sx={{ color: "#fff" }}>
                  Enterprise Grade.
                </Box>{" "}
                <Box component="span" sx={{ color: "rgba(255,255,255,0.32)" }}>
                  Developer Friendly.
                </Box>
              </Typography>
              <Typography
                sx={{
                  mt: 1.75,
                  color: "rgba(255,255,255,0.5)",
                  fontSize: { xs: 15, md: 17 },
                  maxWidth: 660,
                  mx: "auto",
                }}>
                Everything you need to launch and manage digital assets at scale, out of the box.
              </Typography>

              <Box
                sx={{
                  mt: { xs: 5, md: 6 },
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: { xs: 2, md: 2.5 },
                  textAlign: "left",
                }}>
                {FEATURE_CARDS.map((card, i) => (
                  <Box
                    key={i}
                    className="glass-card"
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: "18px !important",
                      transition: "transform 220ms ease, box-shadow 220ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 22px 56px rgba(0,0,0,0.4)",
                      },
                    }}>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: "13px",
                        background: card.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2.25,
                      }}>
                      {card.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#fff",
                        mb: 1,
                        letterSpacing: "-0.02em",
                      }}>
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.52)",
                      }}>
                      {card.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ============================================ READY TO BUILD CTA ============================================ */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 12, md: 18 },
                maxWidth: 1280,
                mx: "auto",
                px: { xs: 2, md: 0 },
              }}>
              <Box
                className="glass-card"
                sx={{
                  position: "relative",
                  p: { xs: 5, md: 9 },
                  borderRadius: "24px !important",
                  textAlign: "center",
                  overflow: "hidden",
                }}>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 32, md: 50 },
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.1,
                      color: "#fff",
                    }}>
                    Ready to build the
                    <br />
                    <span className="gradient-text">Next Big Thing?</span>
                  </Typography>
                  <Typography
                    sx={{
                      mt: 3,
                      maxWidth: 620,
                      mx: "auto",
                      color: "rgba(255,255,255,0.55)",
                      fontSize: { xs: 15, md: 16 },
                      lineHeight: 1.65,
                    }}>
                    Be among the first to deploy on Ice Open Network. The infrastructure is live,
                    the tools are open, and the chain is yours to build on.
                  </Typography>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      justifyContent: "center",
                      gap: 1.75,
                      flexWrap: "wrap",
                    }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={scrollToForm}
                      sx={{ px: 4, py: 1.7, fontSize: 15.5, fontWeight: 600 }}>
                      Get Started Now
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      href="https://github.com/professorblock/ion-minter#readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ px: 4, py: 1.7, fontSize: 15.5, fontWeight: 500 }}>
                      Read the Docs
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { DeployerPage };

function LaunchSummary() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <StyledDescription
        sx={{
          borderRadius: "20px",
          p: 3.5,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.85, mb: 2.75 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h4l2-7 4 14 2-7h6"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}>
            Launch Summary
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}>
          <Row label="Network">
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#34D399",
                  boxShadow: "0 0 8px rgba(52,211,153,0.6)",
                }}
              />
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                ION Mainnet
              </Typography>
            </Box>
          </Row>

          <Row label="Standard">
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
              Jetton (TIP-3)
            </Typography>
          </Row>

          <Row label="Estimated Fee" alignTop>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#34D399", lineHeight: 1.1 }}>
                0.05 ION
              </Typography>
              <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)", mt: 0.25 }}>
                ~$0.001 USD
              </Typography>
            </Box>
          </Row>
        </Box>
      </StyledDescription>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        <StyledDescription sx={{ borderRadius: "16px", p: 2.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              background: "rgba(96,165,250,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.25,
            }}>
            <ShieldRoundedIcon sx={{ fontSize: 16, color: "#60A5FA" }} />
          </Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff", mb: 0.4 }}>
            Audited
          </Typography>
          <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>
            100% secure contracts.
          </Typography>
        </StyledDescription>

        <StyledDescription sx={{ borderRadius: "16px", p: 2.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              background: "rgba(52,211,153,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.25,
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2c0 4-3 6-3 9a3 3 0 006 0c0-3-3-5-3-9zM7 13c0 3 2 7 5 7s5-4 5-7"
                stroke="#34D399"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff", mb: 0.4 }}>
            Burnable
          </Typography>
          <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>
            Deflationary mechanisms.
          </Typography>
        </StyledDescription>
      </Box>
    </Box>
  );
}

const Row = ({
  label,
  children,
  alignTop,
}: {
  label: string;
  children: React.ReactNode;
  alignTop?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: alignTop ? "flex-start" : "center",
      pb: 2,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      "&:last-of-type": { borderBottom: "none", pb: 0 },
    }}>
    <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{label}</Typography>
    {children}
  </Box>
);
