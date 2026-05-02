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
  wordBreak: "break-word",
  lineHeight: 1.5,
}));

export const RowLink = styled(Box)(() => ({
  fontSize: 13,
  color: "#60A5FA",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "right",
  wordBreak: "break-word",
  transition: "color 180ms ease",
  "&:hover": { color: "#A78BFA" },
}));

/* Title is the LEFT label of each row. Made wider so values have room.
   "as" h6 gets converted to a span via component prop in DataRow if needed. */
export const RowTitle = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: "rgba(255,255,255,0.5)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  flexShrink: 0,
  lineHeight: 1.5,
  // generous min-width so titles like "Total Supply" don't break
  minWidth: 160,
  paddingTop: 2,
  [theme.breakpoints.down("sm")]: { minWidth: 110 },
}));

/* THE FIX: Row is now a horizontal flex container.
   - Title sits on the left (fixed-ish width)
   - Value section grows to fill the remaining space
   - Actions sit on the far right
   - Items align to the TOP so multi-line values look clean */
export const RowContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  gap: 16,
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  "&:last-child": { borderBottom: "none" },
  [theme.breakpoints.down("sm")]: { gap: 10 },
}));

interface RowValueSectionProps {
  hasButton?: boolean;
}

/* Value section: right-aligned column, takes remaining width.
   minWidth:0 + flex:1 is the key to making text wrap properly
   instead of overflowing or pushing the title off-screen. */
export const RowValueSection = styled(Box)<RowValueSectionProps>(({ hasButton }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  flex: 1,
  minWidth: 0,
  gap: 4,
  paddingRight: hasButton ? 8 : 0,
  textAlign: "right",
}));

/* The displayer is a wrapper now — must be flex row, NOT a typography
   with break-all. break-all was the bug causing letter-per-line stacking. */
export const RowValueDisplayer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  flex: 1,
  minWidth: 0,
  fontSize: 13,
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  wordBreak: "break-word",
  lineHeight: 1.5,
  "& p, & span": {
    fontSize: 13,
    color: "#FFFFFF",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    wordBreak: "break-word",
    lineHeight: 1.5,
  },
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
