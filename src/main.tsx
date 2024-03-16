import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";

import App from "./App.tsx";

import "./globals.css";
import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      clientId="2ef757ca520c4a59953b1300e20a5579"
      domain="https://gifttech.kinde.com"
      redirectUri="http://localhost:5173"
      logoutUri="http://localhost:5173"
    >
      <WagmiProvider
        config={getDefaultConfig({
          appName: "gifttech",
          projectId: "2d81615423246e5944454fb8f86d9cb0",
          chains: [mainnet, polygon, optimism, arbitrum, base, zora],
        })}
      >
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </KindeProvider>
  </React.StrictMode>
);
