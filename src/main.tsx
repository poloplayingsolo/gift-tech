import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { WagmiProvider } from "wagmi";
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
    <Auth0Provider
      domain="dev-wexspgfc.us.auth0.com"
      clientId="ldCFdEkFAn5S1Xlp5RNQmrikaI50iVzh"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
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
    </Auth0Provider>
  </React.StrictMode>
);
