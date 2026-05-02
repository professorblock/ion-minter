import { getNetwork } from "./lib/hooks/useNetwork";

const ROUTES = {
  deployer: "/",
  jetton: "/jetton",
  jettonId: "/jetton/:id",
};

// Bumped from 1156 → 1280 so page content matches the footer width
// and aligns with the Arena reference grid.
const APP_GRID = 1280;
const LOCAL_STORAGE_PROVIDER = "wallet_provider";
const APP_DISPLAY_NAME = "ION Hub";
const JETTON_DEPLOYER_CONTRACTS_GITHUB = "https://github.com/professorblock/ion-minter";

const EXAMPLE_ADDRESS =
  getNetwork(new URLSearchParams(window.location.search)) === "testnet"
    ? "EQBP4L9h4272Z0j_w9PE2tjHhi8OwkrRbTmatKszMyseis05"
    : "EQD-LkpmPTHhPW68cNfc7B83NcfE9JyGegXzAT8LetpQSRSm";

const SEARCH_HISTORY = "searchHistory";

export {
  ROUTES,
  LOCAL_STORAGE_PROVIDER,
  APP_GRID,
  JETTON_DEPLOYER_CONTRACTS_GITHUB,
  APP_DISPLAY_NAME,
  EXAMPLE_ADDRESS,
  SEARCH_HISTORY,
};
