import { Box, styled, Typography } from "@mui/material";

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
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
      "linear-gradient(90deg, transparent, rgba(0,212,255,0.5) 40%, rgba(124,58,255,0.4) 60%, transparent)",
    pointerEvents: "none",
    zIndex: 1,
  },
};

export const ScreenHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: "#FFFFFF",
  fontSize: 64,
  fontFamily: "'Inter', sans-serif",
  letterSpacing: "-0.04em",
  lineHeight: 1.05,
  "& .g": {
    background: "linear-gradient(135deg, #00D4FF 0%, #7C3AFF 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  [theme.breakpoints.down("md")]: { fontSize: 38 },
  [theme.breakpoints.down("sm")]: { fontSize: 30 },
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 24,
  [theme.breakpoints.down("lg")]: { flexDirection: "column" },
}));

export const SubHeadingWrapper = styled(Box)(({ theme }) => ({
  flex: 6,
  ...glassCard,
  padding: theme.spacing(3.5),
}));

export const StyledDescription = styled(Box)(({ theme }) => ({
  flex: 4,
  ...glassCard,
  padding: theme.spacing(3),
  "& p": {
    fontSize: 14,
    lineHeight: "24px",
    fontFamily: "'Inter', sans-serif",
    color: "rgba(255,255,255,0.55)",
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  gap: 24,
  [theme.breakpoints.down("md")]: { flexDirection: "column", gap: 16 },
}));

export const StyledTxLoaderContent = styled(Box)({
  textAlign: "center",
  "& p": {
    fontSize: 17,
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    color: "rgba(255,255,255,0.85)",
  },
});

export const FormHeading = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: 700,
  fontFamily: "'Inter', sans-serif",
  marginBottom: theme.spacing(2.5),
}));
