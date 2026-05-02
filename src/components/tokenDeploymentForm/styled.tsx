import { Box, styled } from "@mui/material";

export const FormShell = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const FormTitle = styled(Box)(() => ({
  fontSize: 26,
  fontWeight: 700,
  color: "#FFFFFF",
  letterSpacing: "-0.025em",
  marginBottom: 4,
}));

export const FormSubtitle = styled(Box)(({ theme }) => ({
  fontSize: 13.5,
  color: "rgba(255,255,255,0.5)",
  marginBottom: theme.spacing(4),
  fontWeight: 400,
}));

export const FieldGroup = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
  minWidth: 0,
}));

export const FieldRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
}));

/* Advanced row: DECIMALS input | Revocable toggle */
export const AdvancedRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  paddingTop: 4,
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
}));

export const FieldLabel = styled(Box)(() => ({
  fontSize: 10.5,
  fontWeight: 700,
  color: "rgba(255,255,255,0.55)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: "'Inter', sans-serif",
}));

export const RevocableLabel = styled(Box)(() => ({
  fontSize: 13.5,
  fontWeight: 500,
  color: "rgba(255,255,255,0.78)",
  fontFamily: "'Inter', sans-serif",
}));

const inputBase = {
  width: "100%",
  height: 46,
  padding: "0 14px",
  fontSize: 14,
  color: "#FFFFFF",
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  transition: "border-color 180ms ease, box-shadow 180ms ease",
  "&::placeholder": { color: "rgba(255,255,255,0.32)" },
  "&:hover": { borderColor: "rgba(96,165,250,0.32)" },
  "&:focus": {
    borderColor: "#60A5FA",
    boxShadow: "0 0 0 3px rgba(96,165,250,0.14)",
  },
  "&[aria-invalid='true']": { borderColor: "rgba(248,113,113,0.55)" },
};

export const StyledInput = styled("input")(() => ({ ...inputBase }));

export const StyledNumberInput = styled("input")(() => ({ ...inputBase }));

export const StyledTextarea = styled("textarea")(() => ({
  ...inputBase,
  height: "auto",
  minHeight: 96,
  padding: "12px 14px",
  resize: "vertical",
  lineHeight: 1.5,
}));

export const IconLeftAdornment = styled(Box)(() => ({
  position: "absolute",
  left: 14,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255,255,255,0.45)",
  fontSize: 14,
  fontWeight: 600,
  pointerEvents: "none",
  zIndex: 1,
}));

export const AdvancedToggle = styled("button")(() => ({
  alignSelf: "flex-start",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#A78BFA",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  fontFamily: "'Inter', sans-serif",
  padding: "6px 0",
  transition: "color 180ms ease",
  "&:hover": { color: "#C4B5FD" },
}));
