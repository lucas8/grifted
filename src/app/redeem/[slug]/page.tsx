"use client";

import { Navbar } from "@/components/navbar";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base } from "viem/chains";
import { WagmiConfig, createConfig } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";

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
  const [isCompleted, setIsCompleted] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const { name, address } = watch();

  const onSubmit = () => {
    setIsCompleted(true);
  };

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          "--ck-connectbutton-background": "#ECEDEF",
        }}
      >
        <Navbar />
        <main className="flex flex-col items-center my-12">
          <div className="bg-white max-w-[540px] w-full h-full flex flex-col items-center border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-8 px-10">
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
                Redeem your Big Red Boot’s
              </p>
              <p className="mt-2 text-gray-500 text-base">
                Everything’s been paid for, just enter your information below to
                redeem your gift.
              </p>
              {!isCompleted ? (
                <>
                  <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className="mt-3 bg-white w-full border border-gray-300 px-5 py-3 font-body placeholder:text-gray-400 outline-none focus:ring-black focus:border-black rounded-lg"
                      placeholder="Name"
                      {...register("name")}
                    />

                    <input
                      className="mt-3 bg-white w-full border border-gray-300 px-5 py-3 font-body placeholder:text-gray-400 outline-none focus:ring-black focus:border-black rounded-lg"
                      placeholder="Address"
                      {...register("address")}
                    />
                    <button
                      type="submit"
                      className={clsx(
                        "mt-8 bg-black w-full py-3 text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition",
                        !(address?.length > 0 && name?.length > 0) &&
                          "opacity-40 hover:bg-black",
                      )}
                    >
                      Review
                    </button>
                  </form>
                  <button className="mt-2 bg-[#D7D7D8] hover:bg-[#D7D7D8] w-full py-3 rounded-full font-semibold text-lg transition text-black">
                    Decline Grift
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-start mt-12 w-full">
                  <p className="font-display font-bold">Order summary</p>
                  <div className="mt-2 flex flex-row items-center gap-3 w-full">
                    <div className="w-[56px] h-[56px] border border-gray-300 rounded-lg">
                      <Image
                        src="/img/boot-sm.png"
                        width={56}
                        height={56}
                        alt="boot"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <p>Big Red Boots</p>
                      <p className="text-gray-500">Red, Size 11</p>
                    </div>
                    <p className="ml-auto justify-end">
                      <s>$350.00 </s>
                      $0.00
                    </p>
                  </div>
                  <p className="font-display font-bold mt-8">Ship to</p>
                  <p className="mt-1">
                    Lucas Stettner, 123 Bitcoin Road New York, NY 11211
                  </p>
                  <button className="mt-8 bg-black w-full py-3 text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition">
                    Submit & Redeem
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
