import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import { ROUTES } from "consts";
import { useNetwork } from "lib/hooks/useNetwork";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { styled } from "@mui/material/styles";

const Wrap = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  userSelect: "none",
  transition: "opacity 180ms ease",
  "&:hover": { opacity: 0.82 },
}));

const LogoCircle = styled(Box)(() => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  overflow: "hidden",
  flexShrink: 0,
  border: "1.5px solid rgba(0,212,255,0.25)",
  "& img": { width: "100%", height: "100%", objectFit: "cover", display: "block" },
}));

export const AppLogo = () => {
  const navigate = useNavigatePreserveQuery();
  const { network } = useNetwork();

  return (
    <Wrap onClick={() => navigate(ROUTES.deployer)}>
      <LogoCircle>
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/22861.png"
          alt="ION"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/61c4ab0c97a2876131b4d3d3f2634924458f7995.jpg";
          }}
        />
      </LogoCircle>

      <Box sx={{ lineHeight: 1 }}>
        <Box
          component="span"
          sx={{
            display: "block",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 19,
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          ION Hub
        </Box>
        <Box
          component="span"
          sx={{
            display: "block",
            fontSize: 9.5,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}>
          Token Minter
        </Box>
      </Box>

      {network === "testnet" && <Chip label="Testnet" size="small" />}
    </Wrap>
  );
};
