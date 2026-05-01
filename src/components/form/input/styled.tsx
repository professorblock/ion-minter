import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)(() => ({
  width: "100%",
  overflow: "auto",
}));

export const StyledInputContainer = styled(Box)<{ error: boolean }>(({ error }) => ({
  width: "100%",
  minHeight: 56,
  display: "flex",
  alignItems: "center",
  background: "rgba(0,0,0,0.2)",
  border: `1px solid ${error ? "rgba(255,77,106,0.45)" : "rgba(255,255,255,0.10)"}`,
  borderRadius: 18,
  paddingRight: 6,
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
  "&:focus-within": {
    background: "rgba(255,255,255,0.05)",
    borderColor: error ? "#FF4D6A" : "rgba(96,165,250,0.5)",
    boxShadow: error
      ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 0 15px rgba(255,77,106,0.15)"
      : "inset 0 2px 4px rgba(0,0,0,0.3), 0 0 15px rgba(96,165,250,0.15)",
  },
  "&:hover:not(:focus-within)": {
    borderColor: error ? "rgba(255,77,106,0.40)" : "rgba(255,255,255,0.18)",
  },
  "& .base-button": {
    height: "calc(100% - 10px)",
    padding: "0 14px",
    fontSize: 12,
    borderRadius: 9999,
    fontWeight: 700,
  },
}));

export const StyledInput = styled("input")(() => ({
  flex: 1,
  height: "100%",
  minHeight: 56,
  border: "none",
  textIndent: 18,
  background: "transparent",
  outline: "none",
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  fontWeight: 500,
  caretColor: "#60A5FA",
  "&::placeholder": {
    color: "rgba(255,255,255,0.28)",
    fontFamily: "'Inter', sans-serif",
    transition: "opacity 200ms ease",
  },
  "&:focus::placeholder": {
    opacity: 0.45,
  },
}));
