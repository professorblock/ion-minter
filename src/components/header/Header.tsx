import { Box, IconButton, useMediaQuery, Drawer } from "@mui/material";
import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Outlet } from "react-router-dom";
import { HeaderContent, HeaderWrapper } from "./styled";
import { TonConnectButton } from "@ion-gateway/ui-react";

const navItems = ["Products", "Developers", "Community"];

export const Header = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <HeaderWrapper position="sticky" elevation={0}>
        <HeaderContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              minWidth: 0,
            }}>
            <LogoBlock />
          </Box>

          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4.5,
                minWidth: 0,
              }}>
              {navItems.map((item) => (
                <NavItem key={item} label={item} />
              ))}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              minWidth: 0,
            }}>
            {isDesktop ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}>
                <WalletShell />
              </Box>
            ) : (
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                  color: "#fff",
                  width: 42,
                  height: 42,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.08)",
                  },
                }}>
                <MenuRoundedIcon />
              </IconButton>
            )}
          </Box>
        </HeaderContent>
      </HeaderWrapper>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 360,
            background: "rgba(10,12,20,0.98)",
            color: "#fff",
            backdropFilter: "blur(20px)",
          },
        }}>
        <Box
          sx={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 2.5,
          }}>
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.25,
              mb: 4,
            }}>
            {navItems.map((item) => (
              <Box
                key={item}
                sx={{
                  color: "rgba(255,255,255,0.84)",
                  fontSize: 16,
                  fontWeight: 600,
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
      <Box sx={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(96,165,250,0.55), rgba(99,102,241,0.55))",
            filter: "blur(12px)",
            transform: "scale(0.92)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 10px 30px rgba(59,130,246,0.28)",
            color: "#fff",
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: "-0.03em",
          }}>
          I
        </Box>
      </Box>

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
            fontSize: 21,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}>
          ION Hub
        </Box>
        <Box
          sx={{
            mt: 0.55,
            color: "#60A5FA",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.18em",
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
        color: "rgba(255,255,255,0.64)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        cursor: "pointer",
        py: 1,
        transition: "color 180ms ease",
        "&:hover": {
          color: "#fff",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          bottom: 2,
          width: 0,
          height: 2,
          borderRadius: "999px",
          background: "linear-gradient(90deg, #60A5FA 0%, #818CF8 100%)",
          transform: "translateX(-50%)",
          transition: "width 180ms ease",
        },
        "&:hover::after": {
          width: "100%",
        },
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
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -2,
          borderRadius: "999px",
          background: "linear-gradient(90deg, rgba(59,130,246,0.48), rgba(99,102,241,0.42))",
          filter: "blur(12px)",
          opacity: 0.95,
        },
        "& .tc-root, & .tc-button, & button": {
          width: fullWidth ? "100% !important" : "auto",
        },
        "& button": {
          position: "relative",
          zIndex: 1,
          minHeight: "46px !important",
          padding: "0 20px !important",
          borderRadius: "999px !important",
          border: "1px solid rgba(255,255,255,0.10) !important",
          background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%) !important",
          boxShadow: "0 12px 32px rgba(37,99,235,0.32) !important",
          color: "#fff !important",
          fontWeight: "700 !important",
          fontFamily: "Inter, sans-serif !important",
          transition: "transform 180ms ease, box-shadow 180ms ease !important",
        },
        "& button:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 16px 38px rgba(37,99,235,0.42) !important",
        },
        "& *": {
          color: "#fff !important",
          fontFamily: "Inter, sans-serif !important",
        },
        "& img": {
          display: "none !important",
        },
        "& svg": {
          color: "#fff !important",
          fill: "#fff !important",
        },
      }}>
      <TonConnectButton />
    </Box>
  );
};
