import React from "react";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const resources = ["Documentation", "Block Explorer", "Network Status"];
const community = ["Twitter / X", "Telegram", "Discord"];

export const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          mt: { xs: 12, md: 16 },
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "linear-gradient(180deg, rgba(7,10,20,0.18) 0%, rgba(7,10,20,0.52) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            mx: "auto",
            px: { xs: "18px", md: "40px" },
            pt: { xs: 7, md: 9 },
            pb: { xs: 4, md: 5 },
          }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2.1fr 1fr 1fr" },
              alignItems: "start",
              columnGap: { xs: 0, md: 8 },
              rowGap: { xs: 5, md: 4 },
              pb: { xs: 5, md: 6 },
            }}>
            <Box sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                }}>
                <Box sx={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, rgba(96,165,250,0.50), rgba(99,102,241,0.45))",
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
                      border: "1px solid rgba(255,255,255,0.14)",
                      boxShadow: "0 10px 28px rgba(59,130,246,0.24)",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: 18,
                      letterSpacing: "-0.03em",
                    }}>
                    I
                  </Box>
                </Box>

                <Box sx={{ lineHeight: 1 }}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                    }}>
                    ION Hub
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.6,
                      color: "#60A5FA",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}>
                    Token Minter
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.56)",
                  fontSize: 14,
                  lineHeight: "24px",
                  maxWidth: 380,
                }}>
                Launch, manage, and explore token deployment on Ice Open Network with a cleaner
                creation flow inspired by modern product interfaces.
              </Typography>
            </Box>

            <FooterGroup title="Resources" items={resources} />
            <FooterGroup title="Community" items={community} />
          </Box>

          <Box
            sx={{
              pt: { xs: 3.5, md: 4 },
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2.5,
            }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.34)",
                fontSize: 12.5,
                letterSpacing: "-0.01em",
              }}>
              © {new Date().getFullYear()} Ice Open Network. All rights reserved.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SocialBubble label="TG" />
              <SocialBubble label="X" />
              <SocialBubble label="GH" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Outlet />
    </>
  );
};

const FooterGroup = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          mb: 2.5,
        }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.7 }}>
        {items.map((item) => (
          <Typography
            key={item}
            sx={{
              color: "rgba(255,255,255,0.54)",
              fontSize: 14,
              lineHeight: 1.4,
              cursor: "pointer",
              width: "fit-content",
              transition: "color 180ms ease, transform 180ms ease",
              "&:hover": {
                color: "#8AB4FF",
                transform: "translateX(2px)",
              },
            }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const SocialBubble = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.72)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        fontSize: 12,
        fontWeight: 700,
        transition: "all 180ms ease",
        cursor: "pointer",
        "&:hover": {
          color: "#fff",
          background: "rgba(255,255,255,0.08)",
          borderColor: "rgba(255,255,255,0.14)",
          transform: "translateY(-1px)",
        },
      }}>
      {label}
    </Box>
  );
};
