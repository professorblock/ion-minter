import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)({ width: "100%", overflow: "auto" });

export const StyledInputContainer = styled(Box)<{ error: boolean }>(({ error }) => ({
  width: "100%",
  height: 52,
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${error ? "rgba(255,77,106,0.45)" : "rgba(255,255,255,0.08)"}`,
  borderRadius: 13,
  paddingRight: 6,
  transition: "all 200ms ease",
  "&:focus-within": {
    borderColor: error ? "#FF4D6A" : "#00D4FF",
    boxShadow: error ? "0 0 0 3px rgba(255,77,106,0.12)" : "0 0 0 3px rgba(0,212,255,0.12)",
    background: "rgba(0,212,255,0.03)",
  },
  "&:hover:not(:focus-within)": {
    borderColor: error ? "rgba(255,77,106,0.4)" : "rgba(0,212,255,0.22)",
    background: "rgba(255,255,255,0.05)",
  },
  "& .base-button": {
    height: "calc(100% - 10px)",
    padding: "0 14px",
    fontSize: 12,
    borderRadius: 9,
    fontWeight: 700,
  },
}));

export const StyledInput = styled("input")({
  flex: 1,
  height: "100%",
  border: "none",
  textIndent: 16,
  background: "transparent",
  outline: "none",
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  fontWeight: 500,
  caretColor: "#00D4FF",
  "&::placeholder": {
    color: "rgba(255,255,255,0.28)",
    fontFamily: "'Inter', sans-serif",
    transition: "opacity 200ms ease",
  },
  "&:focus::placeholder": { opacity: 0.4 },
});
