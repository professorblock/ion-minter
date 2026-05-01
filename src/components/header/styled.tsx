import { AppBar, styled } from "@mui/material";
import { Box } from "@mui/system";

export const HeaderWrapper = styled(AppBar)(() => ({
  height: 88, // Reduced from 88
  background: "rgba(0, 0, 0, 0.5)", // Darker, cleaner
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)", // Thinner border
  boxShadow: "none", // Arena has no heavy shadow
  position: "sticky",
  top: 0,
  zIndex: 1200,
}));

export const HeaderContent = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 1280, // Matches hero width
  margin: "0 auto",
  height: "100%",
  padding: "0 40px",
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr", // Balanced grid
  alignItems: "center",
  columnGap: 24,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr auto",
    padding: "0 16px",
  },
}));
