import { useState } from "react";
import { Address } from "ton";
import { Box, Fade, Typography } from "@mui/material";
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
          <Box
            sx={{
              position: "relative",
              minHeight: "100vh",
              color: "#fff",
              overflow: "hidden",
              pt: { xs: 4, md: 8 },
              pb: { xs: 8, md: 14 },
            }}>
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                background: "#000000",
                pointerEvents: "none",
              }}>
              <Box
                className="bg-grid mask-radial"
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.3,
                  mixBlendMode: "overlay",
                }}
              />
              <Box
                className="animate-pulse-slow"
                sx={{
                  position: "absolute",
                  top: "-20%",
                  left: "-10%",
                  width: "60vw",
                  height: "60vw",
                  borderRadius: "50%",
                  background: "rgba(37,99,235,0.10)",
                  filter: "blur(150px)",
                  mixBlendMode: "screen",
                }}
              />
              <Box
                className="animate-pulse-slow"
                sx={{
                  position: "absolute",
                  bottom: "-20%",
                  right: "-10%",
                  width: "50vw",
                  height: "50vw",
                  borderRadius: "50%",
                  background: "rgba(79,70,229,0.10)",
                  filter: "blur(120px)",
                  mixBlendMode: "screen",
                  animationDelay: "3s",
                }}
              />
              <Box
                className="animate-pulse-slow"
                sx={{
                  position: "absolute",
                  top: "20%",
                  right: "20%",
                  width: "30vw",
                  height: "30vw",
                  borderRadius: "50%",
                  background: "rgba(147,51,234,0.10)",
                  filter: "blur(100px)",
                  mixBlendMode: "screen",
                  animationDelay: "1.5s",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                mt: { xs: 3, md: 5 },
                mb: 8,
                textAlign: "center",
              }}>
              {" "}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(59,130,246,0.10)",
                  border: "1px solid rgba(59,130,246,0.20)",
                  borderRadius: 999,
                  px: 2,
                  py: 0.8,
                  mb: 4,
                  boxShadow: "0 0 10px rgba(59,130,246,0.2)",
                  backdropFilter: "blur(12px)",
                }}>
                <Typography sx={{ fontSize: 13, lineHeight: 1 }}>⚡</Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#60A5FA",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}>
                  LIVE ON ION MAINNET
                </Typography>
              </Box>
              <ScreenHeading variant="h1">
                Launch Tokens
                <br />
                <Box component="span" sx={{ display: "inline-block" }}>
                  <Box component="span" sx={{ color: "#FFFFFF" }}>
                    on{" "}
                  </Box>
                  <Box component="span" className="g">
                    ION.
                  </Box>
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    mt: { xs: 1.5, md: 2 },
                    fontSize: { xs: 18, md: 24 },
                    lineHeight: 1.15,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "rgba(255,255,255,0.92)",
                    textShadow: "0 0 22px rgba(96,165,250,0.18)",
                  }}>
                  <Box></Box>
                </Box>
              </ScreenHeading>
              <Box sx={{ mt: { xs: 1.5, md: 2.2 }, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(59,130,246,0.10)",
                    border: "1px solid rgba(59,130,246,0.20)",
                    borderRadius: 999,
                    px: 2,
                    py: 0.8,
                    boxShadow: "0 0 10px rgba(59,130,246,0.2)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#60A5FA",
                      boxShadow: "0 0 12px rgba(96,165,250,0.7)",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#60A5FA",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      lineHeight: 1,
                    }}>
                    At Lightning Speed
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  mt: 3,
                  maxWidth: 760,
                  mx: "auto",
                  color: "rgba(255,255,255,0.66)",
                  fontSize: { xs: 17, md: 22 },
                  lineHeight: { xs: "30px", md: "38px" },
                  fontWeight: 400,
                }}>
                The industry-leading token generation engine for the{" "}
                <Box component="span" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
                  Ice Open Network
                </Box>
                . Deploy instantly with zero code, zero friction, and near-zero gas.
              </Typography>
            </Box>

            <Box
              sx={{
                my: 5,
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
                maxWidth: 900,
                mx: "auto",
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
                  background: "linear-gradient(90deg, #050505, transparent)",
                },
                "&::after": {
                  right: 0,
                  background: "linear-gradient(-90deg, #050505, transparent)",
                },
              }}>
              <Box
                sx={{
                  display: "inline-flex",
                  gap: 2,
                  whiteSpace: "nowrap",
                  width: "max-content",
                  animation: "ticker 22s linear infinite",
                }}>
                {STATS.map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      color: "rgba(255,255,255,0.55)",
                      background: "rgba(255,255,255,0.04)",
                      px: 2,
                      py: 1,
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#3B82F6" : "#8B5CF6",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.72)",
                      }}>
                      {s}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ position: "relative", zIndex: 1, mt: 8 }}>
              <FormWrapper sx={{ maxWidth: 1280, mx: "auto" }}>
                <SubHeadingWrapper>
                  <Box
                    sx={{
                      position: "absolute",
                      top: -100,
                      right: -80,
                      width: 260,
                      height: 260,
                      background: "rgba(37,99,235,0.10)",
                      filter: "blur(100px)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -120,
                      left: -90,
                      width: 280,
                      height: 280,
                      background: "rgba(79,70,229,0.10)",
                      filter: "blur(110px)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 34,
                        fontWeight: 800,
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

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    mt: { xs: 3, md: 5 },
                    mb: 8,
                    textAlign: "center",
                  }}>
                  {" "}
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <StyledDescription
        sx={{
          borderRadius: "32px",
          p: 4,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)",
          }}
        />
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            mb: 3,
          }}>
          Launch Summary
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Network</Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.7,
                borderRadius: 2,
                background: "rgba(255,255,255,0.05)",
              }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 10px rgba(16,185,129,0.6)",
                }}
              />
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
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
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Standard</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Jetton</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              Estimated Fee
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#34D399", lineHeight: 1.1 }}>
                0.05 ION
              </Typography>
              <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                ~ network dependent
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledDescription>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <StyledDescription
          sx={{
            borderRadius: "24px",
            p: 2.5,
          }}>
          <Typography sx={{ fontSize: 22, mb: 1 }}>🛡️</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#fff", mb: 0.5 }}>
            Audited
          </Typography>
          <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>
            Secure deployment flow.
          </Typography>
        </StyledDescription>

        <StyledDescription
          sx={{
            borderRadius: "24px",
            p: 2.5,
          }}>
          <Typography sx={{ fontSize: 22, mb: 1 }}>🔥</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#fff", mb: 0.5 }}>
            Mainnet Ready
          </Typography>
          <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>
            Built for live launches.
          </Typography>
        </StyledDescription>
      </Box>
    </Box>
  );
}
