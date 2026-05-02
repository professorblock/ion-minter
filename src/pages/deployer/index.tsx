import { useState } from "react";
import { Address } from "ton";
import { Box, Button, Fade, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
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
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { useTonAddress, useTonConnectUI } from "@ion-gateway/ui-react";

const DEFAULT_DECIMALS = 9;
const isOffchainInternal = getUrlParam("offchainINTERNAL") !== null;
const formSpec = isOffchainInternal ? offchainFormSpec : onchainFormSpec;

async function fetchDecimalsOffchain(url: string): Promise<{ decimals?: string }> {
  const res = await fetch(url);
  return res.json();
}

/* ================================================================
   Status pills shown beneath the hero CTAs (recent mint activity).
   Arena reference: 3 pills with colored dots.
   ================================================================ */
const RECENT_ACTIVITY = [
  { label: "Minted", token: "PEPE", time: "2 mins ago", dot: "#34D399" },
  { label: "Minted", token: "DOGE", time: "5 mins ago", dot: "#60A5FA" },
  { label: "Deployed", token: "ION-X", time: "12 mins ago", dot: "#A78BFA" },
];

/* ================================================================
   Stats shown in the dark glass card under the hero.
   Arena reference: 30M+ / 0 Gas / 0.3s / 100%.
   ================================================================ */
const HERO_STATS = [
  { value: "30M+", label: "Active Users" },
  { value: "0 Gas", label: "Regular TXs" },
  { value: "0.3s", label: "Finality Time" },
  { value: "100%", label: "On-Chain" },
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

  /* Smooth scroll helper for "Start Building" CTA */
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
            {/* ========= HERO ========= */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 4, md: 8 },
                textAlign: "center",
              }}>
              {/* "V2 INFRASTRUCTURE LIVE" pill */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(96,165,250,0.08)",
                  border: "1px solid rgba(96,165,250,0.22)",
                  borderRadius: 999,
                  px: 2,
                  py: 0.85,
                  mb: 4,
                  boxShadow: "0 0 24px rgba(96,165,250,0.18)",
                  backdropFilter: "blur(12px)",
                }}>
                <Box
                  className="status-dot"
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#60A5FA",
                    boxShadow: "0 0 10px rgba(96,165,250,0.9)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: "#93C5FD",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}>
                  V2 Infrastructure Live
                </Typography>
              </Box>

              {/* Heading */}
              <ScreenHeading variant="h1">
                Launch Tokens
                <br />
                <span className="g">At Lightning Speed.</span>
              </ScreenHeading>

              {/* Subheading */}
              <Typography
                sx={{
                  mt: 3,
                  maxWidth: 720,
                  mx: "auto",
                  color: "rgba(255,255,255,0.62)",
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: { xs: "26px", md: "28px" },
                  fontWeight: 400,
                  px: 2,
                }}>
                The industry-leading token generation engine for the{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 600 }}>
                  Ice Open Network
                </Box>
                . Deploy instantly with zero code, zero friction, and near-zero gas.
              </Typography>

              {/* Two CTAs */}
              <Box
                sx={{
                  mt: 4.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  flexWrap: "wrap",
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
                  onClick={scrollToForm}
                  sx={{
                    px: 3,
                    py: 1.4,
                    fontSize: 14.5,
                    fontWeight: 600,
                  }}>
                  Start Building
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
                  href="https://ice.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    px: 3,
                    py: 1.4,
                    fontSize: 14.5,
                    fontWeight: 500,
                  }}>
                  Explore Network
                </Button>
              </Box>

              {/* Recent activity status pills */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.25,
                  flexWrap: "wrap",
                  px: 2,
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
                      px: 1.5,
                      py: 0.7,
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
                      sx={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.55)",
                        fontWeight: 500,
                      }}>
                      {item.label}:
                    </Typography>
                    <Box
                      sx={{
                        fontFamily: "'SF Mono', Menlo, Monaco, 'Courier New', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.92)",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 0.75,
                        px: 0.75,
                        py: 0.15,
                        letterSpacing: "0.02em",
                      }}>
                      {item.token}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 500,
                      }}>
                      {item.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ========= STATS BAR ========= */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 5, md: 7 },
                maxWidth: 1100,
                mx: "auto",
                px: { xs: 1, md: 0 },
              }}>
              <Box
                className="glass-card"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                  gap: { xs: 3, md: 0 },
                  py: { xs: 4, md: 4.5 },
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
                        fontSize: { xs: 30, md: 38 },
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        color: "#FFFFFF",
                        lineHeight: 1.05,
                      }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 10.5,
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

            {/* ========= TOKEN DEPLOYMENT (form section) =========
                Phase B will rebuild the heading area; the form below
                is preserved as-is so existing wallet/contract logic
                keeps working. */}
            <Box
              id="token-deployment"
              sx={{ position: "relative", zIndex: 1, mt: { xs: 10, md: 14 } }}>
              <FormWrapper sx={{ maxWidth: 1280, mx: "auto" }}>
                <SubHeadingWrapper>
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 28,
                        fontWeight: 700,
                        mb: 1,
                        letterSpacing: "-0.03em",
                      }}>
                      Configure Token
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 14,
                        mb: 4,
                      }}>
                      Define the core parameters of your new ION Jetton asset.
                    </Typography>

                    <Form
                      isLoading={isLoading}
                      submitText="Deploy to Mainnet"
                      onSubmit={deployContract}
                      inputs={formSpec}
                    />
                  </Box>
                </SubHeadingWrapper>

                <Box sx={{ width: { xs: "100%", lg: 380 }, flexShrink: 0 }}>
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

/* ================================================================
   Launch Summary side panel — kept from previous version.
   Will be restyled in Phase B.
   ================================================================ */
function Description() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <StyledDescription
        sx={{
          borderRadius: "24px",
          p: 3.5,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            mb: 3,
          }}>
          Launch Summary
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>Network</Typography>
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
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>Standard</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
              Jetton (TIP-3)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              pb: 2.5,
            }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
              Estimated Fee
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#34D399", lineHeight: 1.1 }}>
                0.05 ION
              </Typography>
              <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)", mt: 0.25 }}>
                ~$0.001 USD
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 0.5,
              py: 1.4,
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: 14,
            }}>
            Deploy to Mainnet
          </Button>

          <Typography
            sx={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
              lineHeight: 1.5,
              mt: 0.5,
            }}>
            Smart contract deployment is immutable. Please verify all
            <br />
            details before confirming the transaction.
          </Typography>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-5z"
                stroke="#60A5FA"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
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
