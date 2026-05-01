import { checkImageURL, checkDecimals } from "helpers";

const onchainFormSpec = [
  {
    name: "name",
    label: "Token Name",
    description: "Your project name with spaces (usually 1-3 words).",
    type: "text",
    default: "Bitcoin Cash",
    required: true,
    errorMessage: "Name required",
  },
  {
    name: "symbol",
    label: "Token Symbol",
    description: "Currency symbol appearing in balance (usually 3-5 uppercase characters).",
    type: "text",
    default: "BCH",
    required: true,
    errorMessage: "Symbol required",
  },
  {
    name: "decimals",
    label: "Token Decimals",
    description: "The decimal precision of your token (9 is the ION default).",
    type: "number",
    validate: checkDecimals,
    default: 9,
    showDefault: true,
    required: true,
    errorMessage: "Decimals must be between 0 and 255",
  },
  {
    name: "mintAmount",
    label: "Tokens to Mint",
    description: "Number of initial tokens to mint and send to your wallet (float).",
    type: "number",
    default: 21000000,
    required: true,
    errorMessage: "Mint amount required",
  },
  {
    name: "description",
    label: "Description",
    description: "A short sentence describing your project.",
    type: "string",
    default: "Low fee peer-to-peer electronic cash alternative to Bitcoin",
  },
  {
    name: "tokenImage",
    label: "Token Logo URL",
    description: "URL of a 256×256 PNG image with a transparent background.",
    type: "string",
    required: false,
    validate: checkImageURL,
    default: "https://bitcoincash-example.github.io/website/logo.png",
  },
];

const offchainFormSpec = [
  {
    name: "offchainUri",
    label: "Offchain URI",
    description: "JSON containing token metadata. Pin it if using IPFS.",
    type: "string",
    default: "",
    required: true,
    errorMessage: "URI required",
  },
  {
    name: "mintAmount",
    label: "Amount to Mint",
    description: "Number of initial tokens to mint and send to your wallet (float).",
    type: "number",
    default: 21000000,
    required: true,
    errorMessage: "Mint amount required",
    disabled: undefined,
  },
];

export { onchainFormSpec, offchainFormSpec };
