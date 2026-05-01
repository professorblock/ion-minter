import { Box, styled } from "@mui/material";

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "20px",
  position: "relative" as const,
  overflow: "hidden" as const,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), rgba(124,58,255,0.3), transparent)",
    pointerEvents: "none",
  },
};

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 24,
  width: "100%",
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("lg")]: { flexDirection: "column" },
  [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(2) },
}));

export const StyledCategory = styled(Box)(({ theme }) => ({
  width: "calc(50% - 12px)",
  padding: "24px 28px 28px",
  borderRadius: 20,
  [theme.breakpoints.down("lg")]: { width: "100%", padding: "20px 20px" },
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
  gap: 16,
  marginBottom: 24,
  alignItems: "center",
});

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
    fontSize: 20,
    fontWeight: 700,
    color: "#FFFFFF",
    margin: 0,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.3px",
  },
});

export const StyledTopImg = styled(Box)(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: "50%",
  overflow: "hidden",
  background: "rgba(0,212,255,0.07)",
  border: "2px solid rgba(0,212,255,0.18)",
  flexShrink: 0,
  "& img": { width: "100%", height: "100%", objectFit: "cover" },
  [theme.breakpoints.down("sm")]: { width: 60, height: 60 },
}));
