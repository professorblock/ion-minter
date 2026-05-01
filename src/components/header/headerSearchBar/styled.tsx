import { Box, styled } from "@mui/material";

export const SearchBarWrapper = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 42,
  borderRadius: 12,
  padding: "0 12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  gap: 8,
  zIndex: 3,
  minWidth: 260,
  transition: "all 200ms ease",
  "&:focus-within": {
    borderColor: "rgba(0,212,255,0.4)",
    background: "rgba(0,212,255,0.04)",
    boxShadow: "0 0 0 3px rgba(0,212,255,0.1)",
  },
}));

export const SearchBarInput = styled("input")(() => ({
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#FFFFFF",
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  caretColor: "#00D4FF",
  "&::placeholder": { color: "rgba(255,255,255,0.28)" },
}));

export const IndentlessIcon = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  opacity: 0.4,
  "& img": { display: "block" },
}));

export const CenteringWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SearchResultsWrapper = styled(Box)(() => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  right: 0,
  borderRadius: 12,
  background: "#1A1B23",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  zIndex: 10,
  padding: "8px 0",
  display: "flex",
  flexDirection: "column",
}));

export const SearchResultsItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 12px",
  cursor: "pointer",
  transition: "background 150ms ease",
  "&:hover": {
    background: "rgba(255,255,255,0.05)",
  },
}));
