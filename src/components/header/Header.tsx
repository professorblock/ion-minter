import { Box, IconButton, useMediaQuery, Drawer } from "@mui/material";
import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Outlet } from "react-router-dom";
import { HeaderContent, HeaderWrapper } from "./styled";
import { TonConnectButton } from "@ion-gateway/ui-react";

// Arena reference nav labels — firm
const navItems = ["Ecosystem", "Developers", "Governance"];

export const Header = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <HeaderWrapper position="sticky" elevation={0}>
        <HeaderContent>
          {/* LEFT: Logo block */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              minWidth: 0,
            }}>
            <LogoBlock />
          </Box>

          {/* CENTER: Nav links (desktop only) */}
          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                minWidth: 0,
              }}>
              {navItems.map((item) => (
                <NavItem key={item} label={item} />
              ))}
            </Box>
          )}

          {/* RIGHT: Connect Wallet (desktop) or Menu icon (mobile) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              minWidth: 0,
            }}>
            {isDesktop ? (
              <WalletShell />
            ) : (
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                  color: "#fff",
                  width: 42,
                  height: 42,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  "&:hover": { background: "rgba(255,255,255,0.08)" },
                }}>
                <MenuRoundedIcon />
              </IconButton>
            )}
          </Box>
        </HeaderContent>
      </HeaderWrapper>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 360,
            background: "rgba(0,0,0,0.96)",
            color: "#fff",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          },
        }}>
        <Box sx={{ minHeight: "100%", display: "flex", flexDirection: "column", px: 3, py: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}>
            <LogoBlock />
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{
                color: "#fff",
                width: 42,
                height: 42,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
              }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25, mb: 4 }}>
            {navItems.map((item) => (
              <Box
                key={item}
                sx={{
                  color: "rgba(255,255,255,0.84)",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  py: 1,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                {item}
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: "auto", pt: 2 }}>
            <WalletShell fullWidth />
          </Box>
        </Box>
      </Drawer>

      <Outlet />
    </>
  );
};

/* ================================================================
   ION Logo — placeholder snowflake/crystal SVG
   Replace this with the official ION logo PNG when you have it.
   See Phase A instructions for swap-in steps.
   ================================================================ */
const IonLogoMark = ({ size = 42 }: { size?: number }) => (
  <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
    {/* soft glow behind */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(96,165,250,0.55), rgba(167,139,250,0.55))",
        filter: "blur(12px)",
        transform: "scale(0.9)",
      }}
    />
    {/* logo tile */}
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #2563EB 0%, #6366F1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: "0 10px 30px rgba(59,130,246,0.32)",
      }}>
      {/* placeholder snowflake-style mark — swap with official ION logo later */}
      <svg
        width="60%"
        height="60%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.6" fill="white" />
      </svg>
    </Box>
  </Box>
);

const LogoBlock = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: "pointer",
        userSelect: "none",
      }}>
      <IonLogoMark />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1,
          minWidth: 0,
        }}>
        <Box
          sx={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
          }}>
          ION Hub
        </Box>
        <Box
          sx={{
            mt: 0.55,
            color: "#60A5FA",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
          Token Minter
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        position: "relative",
        color: "rgba(255,255,255,0.68)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        cursor: "pointer",
        py: 1,
        transition: "color 180ms ease",
        "&:hover": { color: "#fff" },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          bottom: 2,
          width: 0,
          height: 2,
          borderRadius: "999px",
          background: "linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)",
          transform: "translateX(-50%)",
          transition: "width 180ms ease",
        },
        "&:hover::after": { width: "100%" },
      }}>
      {label}
    </Box>
  );
};

const WalletShell = ({ fullWidth = false }: { fullWidth?: boolean }) => {
  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        position: "relative",
        // soft outer glow
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -2,
          borderRadius: "999px",
          background: "linear-gradient(90deg, rgba(59,130,246,0.45), rgba(99,102,241,0.40))",
          filter: "blur(14px)",
          opacity: 0.9,
          pointerEvents: "none",
        },
        "& .tc-root, & .tc-button, & button": {
          width: fullWidth ? "100% !important" : "auto",
        },
        "& button": {
          position: "relative",
          zIndex: 1,
          minHeight: "44px !important",
          padding: "0 22px !important",
          borderRadius: "999px !important",
          border: "1px solid rgba(255,255,255,0.12) !important",
          background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%) !important",
          boxShadow: "0 10px 28px rgba(37,99,235,0.34) !important",
          color: "#fff !important",
          fontWeight: "600 !important",
          fontSize: "14px !important",
          fontFamily: "Inter, sans-serif !important",
          letterSpacing: "-0.01em !important",
          transition: "transform 180ms ease, box-shadow 180ms ease !important",
        },
        "& button:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 14px 36px rgba(37,99,235,0.44) !important",
        },
        "& *": {
          color: "#fff !important",
          fontFamily: "Inter, sans-serif !important",
        },
        "& img": { display: "none !important" },
        "& svg": {
          color: "#fff !important",
          fill: "#fff !important",
        },
      }}>
      <TonConnectButton />
    </Box>
  );
};
