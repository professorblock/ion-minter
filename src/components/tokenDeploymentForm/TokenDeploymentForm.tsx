import { useState } from "react";
import { Box, Button, CircularProgress, Switch, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useTonAddress, useTonConnectUI } from "@ion-gateway/ui-react";
import {
  AdvancedToggle,
  FieldGroup,
  FieldLabel,
  FieldRow,
  FormShell,
  FormSubtitle,
  FormTitle,
  IconLeftAdornment,
  StyledInput,
  StyledNumberInput,
  StyledTextarea,
  AdvancedRow,
  RevocableLabel,
} from "./styled";

/* ================================================================
   Token Deployment Form — Arena pixel-match
   ----------------------------------------------------------------
   Layout:
     TOKEN NAME             (full width)
     SYMBOL | INITIAL SUPPLY (two columns)
     DESCRIPTION            (textarea)
     LOGO URL (OPTIONAL)    (with globe icon)
     ⌄ Show Advanced Options
       └─ DECIMALS  | Revocable toggle (revealed when expanded)

   Submits to onSubmit with the shape the existing deployContract
   expects:  { name, symbol, mintAmount, description, tokenImage,
               decimals, revocable }
   The "revocable" flag is currently UI-only — wallet/contract logic
   ignores it. Wire it in when you decide on the post-deploy flow.
   ================================================================ */

export interface TokenDeploymentFormValues {
  name: string;
  symbol: string;
  mintAmount: string;
  description: string;
  tokenImage: string;
  decimals: string;
  revocable: boolean;
}

interface Props {
  onSubmit: (values: TokenDeploymentFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function TokenDeploymentForm({ onSubmit, isLoading = false }: Props) {
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { control, handleSubmit, formState } = useForm<TokenDeploymentFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      symbol: "",
      mintAmount: "",
      description: "",
      tokenImage: "",
      decimals: "9",
      revocable: true,
    },
  });

  const handleConnectWallet = () => {
    if (tonConnectUI) tonConnectUI.openModal();
  };

  return (
    <FormShell>
      <FormTitle>Configure Token</FormTitle>
      <FormSubtitle>Define the core parameters of your new ION Jetton asset.</FormSubtitle>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 0.5 }}
        noValidate>
        {/* TOKEN NAME — full width */}
        <FieldGroup>
          <FieldLabel>Token Name</FieldLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Token name is required" }}
            render={({ field }) => (
              <StyledInput
                {...field}
                placeholder="e.g. Ice Open Network"
                aria-invalid={!!formState.errors.name}
              />
            )}
          />
        </FieldGroup>

        {/* SYMBOL | INITIAL SUPPLY — two columns */}
        <FieldRow>
          <FieldGroup>
            <FieldLabel>Symbol</FieldLabel>
            <Controller
              name="symbol"
              control={control}
              rules={{ required: "Symbol is required" }}
              render={({ field }) => (
                <Box sx={{ position: "relative" }}>
                  <IconLeftAdornment>$</IconLeftAdornment>
                  <StyledInput
                    {...field}
                    placeholder="ICE"
                    style={{ paddingLeft: 32 }}
                    aria-invalid={!!formState.errors.symbol}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </Box>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Initial Supply</FieldLabel>
            <Controller
              name="mintAmount"
              control={control}
              rules={{ required: "Initial supply is required" }}
              render={({ field }) => (
                <NumberFormat
                  value={field.value}
                  thousandSeparator=","
                  customInput={StyledNumberInput}
                  placeholder="1,000,000,000"
                  onValueChange={(values) => field.onChange(values.value)}
                  aria-invalid={!!formState.errors.mintAmount}
                />
              )}
            />
          </FieldGroup>
        </FieldRow>

        {/* DESCRIPTION */}
        <FieldGroup>
          <FieldLabel>Description</FieldLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <StyledTextarea
                {...field}
                placeholder="Briefly describe your project's utility and vision..."
                rows={3}
              />
            )}
          />
        </FieldGroup>

        {/* LOGO URL (OPTIONAL) */}
        <FieldGroup>
          <FieldLabel>Logo URL (Optional)</FieldLabel>
          <Controller
            name="tokenImage"
            control={control}
            render={({ field }) => (
              <Box sx={{ position: "relative" }}>
                <IconLeftAdornment>
                  <LanguageRoundedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }} />
                </IconLeftAdornment>
                <StyledInput
                  {...field}
                  type="url"
                  placeholder="https://ipfs.io/ipfs/..."
                  style={{ paddingLeft: 44 }}
                />
              </Box>
            )}
          />
        </FieldGroup>

        {/* Show / Hide Advanced Options */}
        <AdvancedToggle
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          aria-expanded={showAdvanced}>
          <TuneRoundedIcon sx={{ fontSize: 16 }} />
          {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          <ExpandMoreRoundedIcon
            sx={{
              fontSize: 16,
              ml: 0.25,
              transition: "transform 200ms ease",
              transform: showAdvanced ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </AdvancedToggle>

        {/* Advanced fields */}
        {showAdvanced && (
          <AdvancedRow
            sx={{
              animation: "advFade 240ms ease",
              "@keyframes advFade": {
                from: { opacity: 0, transform: "translateY(-4px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}>
            <FieldGroup>
              <FieldLabel>Decimals</FieldLabel>
              <Controller
                name="decimals"
                control={control}
                rules={{
                  required: "Decimals required",
                  validate: (v) => {
                    const n = parseInt(v as string, 10);
                    return (n >= 0 && n <= 255) || "Decimals must be between 0 and 255";
                  },
                }}
                render={({ field }) => (
                  <StyledInput {...field} type="number" placeholder="9" min={0} max={255} />
                )}
              />
            </FieldGroup>

            <Controller
              name="revocable"
              control={control}
              render={({ field }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 46,
                    mt: { xs: 0, sm: "26px" }, // align baseline with the input next to it
                    px: 2,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <RevocableLabel>Revocable</RevocableLabel>
                  <Switch
                    checked={field.value}
                    onChange={(_, checked) => field.onChange(checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        background: "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              )}
            />
          </AdvancedRow>
        )}

        {/* Submit / Connect button */}
        <Box sx={{ mt: 1.5 }}>
          {!walletAddress ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleConnectWallet}
              startIcon={<WalletRoundedIcon sx={{ fontSize: 18 }} />}
              sx={{
                py: 1.6,
                borderRadius: "999px",
                fontSize: 14.5,
                fontWeight: 600,
              }}>
              Connect Wallet to Deploy
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress size={16} sx={{ color: "rgba(255,255,255,0.7)" }} />
                ) : (
                  <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
                )
              }
              sx={{
                py: 1.6,
                borderRadius: "999px",
                fontSize: 14.5,
                fontWeight: 600,
              }}>
              {isLoading ? "Deploying..." : "Deploy to Mainnet"}
            </Button>
          )}

          <Typography
            sx={{
              mt: 1.5,
              fontSize: 11,
              color: "rgba(255,255,255,0.38)",
              textAlign: "center",
              lineHeight: 1.5,
            }}>
            Smart contract deployment is immutable. Please verify all
            <br />
            details before confirming the transaction.
          </Typography>
        </Box>
      </Box>
    </FormShell>
  );
}
