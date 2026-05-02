import { AlertColor, Box, styled, Typography } from "@mui/material";

export const RowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  padding: `${theme.spacing(1.5)} 0`,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  "&:last-child": { borderBottom: "none" },
}));

export const RowLabel = styled(Typography)(() => ({
  fontSize: 13,
  color: "rgba(255,255,255,0.45)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  flexShrink: 0,
  lineHeight: 1.5,
}));

export const RowValue = styled(Typography)(() => ({
  fontSize: 13,
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  textAlign: "right",
  wordBreak: "break-all",
  lineHeight: 1.5,
}));

/* Updated from old cyan #00D4FF → blue #60A5FA matching our theme */
export const RowLink = styled(Box)(() => ({
  fontSize: 13,
  color: "#60A5FA",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "right",
  wordBreak: "break-all",
  transition: "color 180ms ease",
  "&:hover": { color: "#A78BFA" },
}));

export const RowTitle = styled(Typography)(() => ({
  fontSize: 13,
  color: "rgba(255,255,255,0.45)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  flexShrink: 0,
  lineHeight: 1.5,
  minWidth: 140,
}));

export const RowContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  "&:last-child": { borderBottom: "none" },
}));

interface RowValueSectionProps {
  hasButton?: boolean;
}

export const RowValueSection = styled(Box)<RowValueSectionProps>(({ hasButton }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  flex: 1,
  gap: 4,
  paddingRight: hasButton ? 8 : 0,
}));

export const RowValueDisplayer = styled(Typography)(() => ({
  fontSize: 13,
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  textAlign: "right",
  wordBreak: "break-all",
  lineHeight: 1.5,
}));

export const RowActionsButton = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexShrink: 0,
}));

interface RowMessageProps {
  type?: AlertColor;
}

export const RowMessage = styled(Typography)<RowMessageProps>(({ type }) => ({
  fontSize: 12,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  lineHeight: 1.4,
  marginTop: 4,
  wordBreak: "break-word",
  color:
    type === "warning"
      ? "#FBBF24"
      : type === "error"
      ? "#F87171"
      : type === "success"
      ? "#34D399"
      : "rgba(255,255,255,0.5)",
}));
