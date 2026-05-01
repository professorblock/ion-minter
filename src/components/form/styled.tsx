import { Box, styled, Typography } from "@mui/material";

export const StyledForm = styled("form")({ overflow: "hidden", width: "100%" });

export const StyledFormInputs = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 18,
});

export const StyledActionBtn = styled(Box)({
  marginTop: 28,
  width: "100%",
  "& .base-button": {
    width: "100%",
    height: 52,
    borderRadius: 13,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: "none",
    cursor: "pointer",
    transition: "all 240ms ease",
    background: "linear-gradient(135deg, #00D4FF 0%, #7C3AFF 100%)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0,212,255,0.28)",
    "&:hover": {
      boxShadow: "0 8px 36px rgba(0,212,255,0.45)",
      transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(0)" },
    "&:disabled, &[disabled]": {
      background: "rgba(255,255,255,0.07)",
      color: "rgba(255,255,255,0.2)",
      boxShadow: "none",
      cursor: "not-allowed",
      transform: "none",
    },
  },
});

export const JettonFormTitle = styled(Typography)({
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: 700,
  fontFamily: "'Inter', sans-serif",
  marginBottom: 4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 320,
});
