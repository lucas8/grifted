"use client";

import { ConnectKitButton } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
    appName: "Grifted",
    chains: [base],

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
        <nav className="full flex items-center justify-end px-[120px] h-[82px]">
          <ConnectKitButton />
        </nav>
        <main className="flex flex-col items-center text-center py-12">
          <h1 className="font-display text-[56px] font-bold -tracking-[1.6px] leading-[110%]">
            What do you want
            <br /> to Grift?
          </h1>
          <p className="font-body mt-6 text-gray-600">
            Some kind of description of the service and why you should
            <br /> connect your wallet and not worry.
          </p>
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
