import { Box, styled, Typography } from "@mui/material";

/* Glass card surface used for the form panel and side panel */
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

export const PageShell = styled(Box)(() => ({
  position: "relative",
  minHeight: "100vh",
  color: "#fff",
  overflow: "hidden",
  background: "#000000",
}));

export const PageInner = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 32px",
  [theme.breakpoints.down("md")]: {
    padding: "0 18px",
  },
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
  },
}));

export const EyebrowPill = styled(Box)(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "rgba(96,165,250,0.08)",
  border: "1px solid rgba(96,165,250,0.22)",
  borderRadius: 999,
  padding: "8px 16px",
  marginBottom: 32,
  boxShadow: "0 0 24px rgba(96,165,250,0.18)",
  backdropFilter: "blur(12px)",
}));

export const EyebrowDot = styled(Box)(() => ({
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: "#60A5FA",
  boxShadow: "0 0 10px rgba(96,165,250,0.9)",
}));

/* Hero "Launch Tokens / At Lightning Speed." heading.
   The .g child is the gradient text (blue → indigo → purple). */
export const ScreenHeading = styled(Typography)(() => ({
  fontWeight: 800,
  color: "#FFFFFF",
  fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
  fontFamily: "'Inter', sans-serif",
  letterSpacing: "-0.05em",
  lineHeight: 0.98,
  textWrap: "balance" as any,
  "& .g": {
    background: "linear-gradient(135deg, #60A5FA 0%, #818CF8 50%, #A78BFA 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  },
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  maxWidth: 720,
  marginLeft: "auto",
  marginRight: "auto",
  color: "rgba(255,255,255,0.62)",
  fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
  lineHeight: 1.7,
  fontWeight: 400,
}));

/* The dark stat card under the hero */
export const StatsCard = styled(Box)(({ theme }) => ({
  ...glassCard,
  marginTop: theme.spacing(7),
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 0,
  padding: theme.spacing(4.5, 4),
  borderRadius: "20px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(3),
    padding: theme.spacing(4, 3),
  },
}));

export const StatItem = styled(Box)(() => ({
  textAlign: "center",
}));

/* Two-column form section wrapper */
export const FormWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.05fr) minmax(340px, 0.95fr)",
  gap: 24,
  alignItems: "start",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const SubHeadingWrapper = styled(Box)(({ theme }) => ({
  ...glassCard,
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
    borderRadius: "20px",
  },
}));

export const StyledDescription = styled(Box)(({ theme }) => ({
  ...glassCard,
  padding: theme.spacing(3),
  minHeight: "100%",
  "& p": {
    fontSize: 14,
    lineHeight: "22px",
    fontFamily: "'Inter', sans-serif",
    color: "rgba(255,255,255,0.56)",
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: 16,
  },
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
