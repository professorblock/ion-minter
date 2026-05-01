import { Box, Link, styled, Typography } from "@mui/material";

export const PopupTitle = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 700,
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  marginBottom: 16,
}));

export const PopupContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
}));

export const LogoTextAreaWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

export const LogoTextArea = styled("textarea")(() => ({
  width: "100%",
  minHeight: 52,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "14px 16px",
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  fontWeight: 500,
  resize: "none",
  outline: "none",
  transition: "all 200ms ease",
  caretColor: "#00D4FF",
  boxSizing: "border-box",
  lineHeight: 1.6,
  "&::placeholder": { color: "rgba(255,255,255,0.28)" },
  "&:focus": {
    borderColor: "#00D4FF",
    boxShadow: "0 0 0 3px rgba(0,212,255,0.12)",
    background: "rgba(0,212,255,0.03)",
  },
}));

export const PopupDescription = styled(Typography)(() => ({
  fontSize: 13,
  color: "rgba(255,255,255,0.4)",
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.6,
  marginTop: 10,
  marginBottom: 4,
  "& span": {
    color: "#00D4FF",
    "&:hover": { color: "#7C3AFF" },
  },
}));

export const PopupLink = styled(Link)(() => ({
  fontSize: 13,
  color: "rgba(255,255,255,0.35)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  transition: "color 180ms ease",
  "&:hover": { color: "#00D4FF" },
}));
