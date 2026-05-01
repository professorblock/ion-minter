import { Box, styled, Typography } from "@mui/material";

const glassCard = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  position: "relative" as const,
  overflow: "hidden" as const,
  boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
};

export const PageShell = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  color: "#fff",
  overflow: "hidden",
  background: "#020617",
}));

export const PageInner = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 1240,
  margin: "0 auto",
  padding: "0 28px",
  [theme.breakpoints.down("md")]: {
    padding: "0 18px",
  },
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(8),
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

export const EyebrowPill = styled(Box)(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "rgba(59,130,246,0.10)",
  border: "1px solid rgba(59,130,246,0.20)",
  borderRadius: 999,
  padding: "8px 14px",
  marginBottom: 32,
  boxShadow: "0 0 10px rgba(59,130,246,0.16)",
  backdropFilter: "blur(12px)",
}));

export const EyebrowDot = styled(Box)(() => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "#60A5FA",
  boxShadow: "0 0 12px rgba(96,165,250,0.7)",
}));

export const ScreenHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 999,
  color: "#FFFFFF",
  fontSize: 120,
  fontFamily: "'Inter', sans-serif",
  letterSpacing: "-0.045em",
  lineHeight: 0.94,
  textAlign: "center",
  "& .g": {
    background: "linear-gradient(180deg, #6EA8FF 0%, #7D8CFF 45%, #A978FF 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 90,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 68,
    lineHeight: 0.94,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 48,
    lineHeight: 0.96,
  },
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  maxWidth: 880,
  marginLeft: "auto",
  marginRight: "auto",
  color: "rgba(255,255,255,0.66)",
  fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
  lineHeight: 1.75,
  fontWeight: 300,
}));

export const StatsMarquee = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(7),
  overflow: "hidden",
  position: "relative",
}));

export const StatsTrack = styled(Box)(() => ({
  display: "flex",
  gap: 14,
  width: "max-content",
  animation: "marquee 28s linear infinite",
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
}));

export const StatChip = styled(Box)(() => ({
  padding: "12px 18px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.78)",
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: "nowrap",
}));

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
    borderRadius: "24px",
  },
}));

export const StyledDescription = styled(Box)(({ theme }) => ({
  ...glassCard,
  padding: theme.spacing(3),
  minHeight: "100%",
  "& p": {
    fontSize: 14,
    lineHeight: "24px",
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
