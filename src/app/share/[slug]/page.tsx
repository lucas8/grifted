"use client";

import { Navbar } from "@/components/navbar";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base } from "viem/chains";
import { WagmiConfig, createConfig } from "wagmi";
import Image from "next/image";
import Link from "next/link";

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

export default function Page() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          "--ck-connectbutton-background": "#ECEDEF",
        }}
      >
        <Navbar />
        <main className="flex flex-col items-center my-12">
          <div className="bg-white max-w-[540px] w-full h-full flex flex-col items-center border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-6 px-10">
            <div className="w-[150px] h-[157px] border border-gray-300 rounded-3xl">
              <Image
                src="/img/boot-sm.png"
                width={150}
                height={157}
                alt="boot"
              />
            </div>
            <div className="w-full text-center mt-8">
              <p className="font-display text-xl font-bold">
                Big Red Boot’s have been grifted to Lucas!
              </p>
              <p className="mt-2 text-gray-500 text-base">
                You can also copy the link below and share it with them
                directly.
              </p>
              <input
                className="mt-3 bg-white w-full border border-gray-300 px-5 py-3 font-body placeholder:text-gray-400 outline-none focus:ring-black focus:border-black rounded-lg"
                placeholder="Email address"
                type="email"
                value="getgrifted.com/redeem/86701234-8dbc-4958-bddc-7702cec2e45e"
                onChange={() => {}}
              />

              <Link href="/">
                <button className="mt-8 bg-[#D7D7D8] hover:bg-[#D7D7D8] w-full py-3 rounded-full font-semibold text-lg transition text-black">
                  Grift something else
                </button>
              </Link>
            </div>
          </div>
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
