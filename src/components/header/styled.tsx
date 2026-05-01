import { AppBar, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { APP_GRID } from "consts";

export const HeaderWrapper = styled(AppBar)(() => ({
  height: 68,
  background: "rgba(7,7,14,0.85)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "none",
  borderRadius: 0,
}));

export const HeaderContent = styled(Box)(({ theme }) => ({
  maxWidth: APP_GRID,
  width: "100%",
  margin: "0 auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: { width: "calc(100% - 40px)" },
  [theme.breakpoints.down("sm")]: { width: "calc(100% - 24px)" },
}));

export const HeaderOptionalContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: 12,
}));

export const HeaderExampleTextWrapper = styled(Box)(() => ({ display: "none" }));
export const HeaderExampleText = styled(Typography)(() => ({}));
export const HeaderExampleLink = styled(Typography)(() => ({}));
