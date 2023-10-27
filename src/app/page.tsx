"use client";

import { ConnectKitButton } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base } from "viem/chains";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setIsPreviewing = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowPreview(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          "--ck-connectbutton-background": "#ECEDEF",
        }}
      >
        <nav className="full flex items-center justify-end px-[120px] h-[82px]">
          <ConnectKitButton />
        </nav>
        <main className="flex flex-col items-center mt-12">
          <div className="text-center w-full max-w-[480px]">
            <h1 className="font-display text-[56px] font-bold -tracking-[1.6px] leading-[110%]">
              What do you want
              <br /> to Grift?
            </h1>
            <p className="font-body mt-6 text-gray-600">
              Some kind of description of the service and why you should
              <br /> connect your wallet and not worry.
            </p>
            {/* hardcoded yikers! */}
            <div className="border border-gray-200 rounded-lg mt-[32px] shadow-2xl overflow-hidden">
              <form
                className="flex justify-between bg-white items-center pr-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsPreviewing();
                }}
              >
                <input
                  className="w-full px-5 py-3 font-body placeholder:text-gray-400 outline-none focus:ring-black focus:border-black"
                  placeholder="https://www.shopify.com/product-url"
                />
                {isLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-black animate-spin"
                  >
                    <path
                      fill="currentColor"
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      fill="currentColor"
                      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                    />
                  </svg>
                )}

                <button type="submit" />
              </form>
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    className="flex items-center justify-between w-full p-4"
                    initial={{ y: -4, opacity: 0, scaleY: 0.9 }}
                    animate={{ y: 0, opacity: 1, scaleY: 1 }}
                  >
                    <div className="flex gap-2 item-center">
                      <div className="bg-white w-[56px] h-[56px] rounded-lg border border-gray-200">
                        <Image
                          src="/img/boot-sm.png"
                          alt="big-red-boot"
                          objectFit="cover"
                          width={56}
                          height={56}
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start gap-1">
                        <span className="font-body font-semibold text-sm">
                          Big Red Boot | MSCHF
                        </span>
                        <span className="font-body font-semibold text-gray-600 text-sm">
                          $350.00
                        </span>
                      </div>
                    </div>
                    <button className="bg-gray-200 px-4 py-2 text-sm font-semibold text-black rounded-full">
                      Grift it
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-gray-600 mt-3 font-body">
              This is a hint text to help user.
            </p>
          </div>
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
