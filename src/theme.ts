import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00D4FF", contrastText: "#fff" },
    secondary: { main: "#7C3AFF" },
    background: { default: "#07070E", paper: "#0D0C18" },
    text: { primary: "#FFFFFF", secondary: "rgba(255,255,255,0.5)" },
    error: { main: "#FF4D6A" },
    success: { main: "#2BD98F" },
    divider: "rgba(255,255,255,0.06)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    button: { textTransform: "none", fontWeight: 700, letterSpacing: "0.01em" },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#07070E", color: "#FFFFFF" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(7,7,14,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 15,
          padding: "11px 28px",
          transition: "all 240ms ease",
          "&:hover": { transform: "translateY(-1px)" },
          "&:active": { transform: "translateY(0)" },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #00D4FF 0%, #7C3AFF 100%)",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
          "&:hover": { boxShadow: "0 8px 36px rgba(0,212,255,0.45)" },
          "&.Mui-disabled": {
            background: "rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.2)",
            boxShadow: "none",
            transform: "none",
          },
        },
        outlinedPrimary: {
          border: "1px solid rgba(0,212,255,0.3)",
          color: "#00D4FF",
          "&:hover": { border: "1px solid #00D4FF", background: "rgba(0,212,255,0.07)" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 13,
          backgroundColor: "rgba(255,255,255,0.03)",
          color: "#FFFFFF",
          "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
          "&:hover fieldset": { borderColor: "rgba(0,212,255,0.3)" },
          "&.Mui-focused fieldset": {
            borderColor: "#00D4FF",
            boxShadow: "0 0 0 3px rgba(0,212,255,0.12)",
          },
        },
        input: {
          color: "#FFFFFF",
          "&::placeholder": { color: "rgba(255,255,255,0.28)", opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: "rgba(255,255,255,0.4)", "&.Mui-focused": { color: "#00D4FF" } },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { color: "#FFFFFF" },
        icon: { color: "rgba(255,255,255,0.4)" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#0D0C18",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "rgba(0,212,255,0.08)" },
          "&.Mui-selected": { backgroundColor: "rgba(0,212,255,0.14)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,212,255,0.1)",
          color: "#00D4FF",
          border: "1px solid rgba(0,212,255,0.22)",
          fontWeight: 700,
          fontSize: 11,
          height: 22,
          fontFamily: "'Inter', sans-serif",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#151322",
          color: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: 12,
          borderRadius: 8,
          padding: "7px 12px",
        },
        arrow: { color: "#151322" },
      },
    },
    MuiCircularProgress: {
      styleOverrides: { root: { color: "#00D4FF" } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "rgba(255,255,255,0.06)" } },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,212,255,0.06)",
          border: "1px solid rgba(0,212,255,0.15)",
          color: "#FFFFFF",
          borderRadius: 12,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#00D4FF",
          textDecorationColor: "rgba(0,212,255,0.3)",
          "&:hover": { color: "#7C3AFF" },
        },
      },
    },
  },
});

export default theme;
