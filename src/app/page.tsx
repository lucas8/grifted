"use client";

import { ConnectKitButton } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
    appName: "Grifted",

    // Optional
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-xl">hello world</h1>
          <ConnectKitButton />
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
