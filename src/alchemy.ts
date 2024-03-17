import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "s9iQviYf0mVB9dTAAgRKLVch0VZ9DHM0", 
  network: Network.MATIC_MAINNET, 
};

export const alchemy = new Alchemy(settings);
