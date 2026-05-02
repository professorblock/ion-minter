import { Box, styled } from "@mui/material";

/* Glass card surface — matches the landing page's tokenDeployment card */
const glassCard = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "24px",
  position: "relative" as const,
  overflow: "hidden" as const,
  boxShadow: "0 18px 48px rgba(0,0,0,0.32)",
};

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 24,
  width: "100%",
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("lg")]: { flexDirection: "column" },
  [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(2) },
}));

export const StyledCategory = styled(Box)(({ theme }) => ({
  width: "calc(50% - 12px)",
  padding: "28px 32px 32px",
  borderRadius: 24,
  [theme.breakpoints.down("lg")]: { width: "100%", padding: "22px 24px" },
}));

export const StyledCategoryFields = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 18,
});

export const StyledBlock = styled(StyledCategory)({
  ...glassCard,
  height: "100%",
});

export const StyledTop = styled(Box)({
  display: "flex",
  gap: 18,
  marginBottom: 28,
  alignItems: "center",
});

/* Token name + description block next to the logo */
export const StyledTopText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
  "& h5": {
    fontSize: 13,
    fontWeight: 400,
    color: "rgba(255,255,255,0.45)",
    margin: 0,
    fontFamily: "'Inter', sans-serif",
  },
  "& h3": {
    fontSize: 22,
    fontWeight: 700,
    color: "#FFFFFF",
    margin: 0,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.025em",
  },
});

/* Token logo wrapper — blue accent (was cyan) */
export const StyledTopImg = styled(Box)(({ theme }) => ({
  width: 92,
  height: 92,
  borderRadius: "50%",
  overflow: "hidden",
  background: "rgba(96,165,250,0.10)",
  border: "2px solid rgba(96,165,250,0.24)",
  flexShrink: 0,
  "& img": { width: "100%", height: "100%", objectFit: "cover" },
  [theme.breakpoints.down("sm")]: { width: 64, height: 64 },
}));
