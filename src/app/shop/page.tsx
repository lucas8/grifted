"use client";

import { Navbar } from "@/components/navbar";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base } from "viem/chains";
import { WagmiConfig, createConfig } from "wagmi";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { Spinner } from "@/components/Spinner";
import { useRouter } from "next/navigation";

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
  const { register, handleSubmit, watch } = useForm();
  const { name, email } = watch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const onSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      router.push("/share/86701234-8dbc-4958-bddc-7702cec2e45e");
    }, 2000);
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
          <div className="bg-white max-w-[540px] w-full h-full flex flex-col items-center border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <Image src="/img/boot.png" width={344} height={361} alt="boot" />
            <div className="px-10 pb-6">
              <h4 className="font-display font-bold text-xl">
                Big Red Boot | MSCHF
              </h4>
              <p className="mt-2 text-gray-500">
                Cartoon boots for a cool 3D World. Cartoonishness is an
                abstraction that frees us from the constraints of reality. If
                you kick someone in these boots they go BOING!
              </p>
              <p className="font-display font-bold text-2xl mt-4 text-gray-900">
                $350.00
              </p>
              <p className="text-gray-400 mt-1">Shipping is free</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#FCFCFD] w-full py-6 px-10 border-t border-gray-200"
            >
              <p className="font-display font-bold text-base">Recipient</p>
              {!isSubmitting ? (
                <>
                  <input
                    className="mt-3 bg-white w-full border border-gray-300 px-5 py-3 font-body placeholder:text-gray-400 outline-none focus:ring-black focus:border-black rounded-lg"
                    placeholder="Name"
                    {...register("name")}
                  />

                  <input
                    className="mt-3 bg-white w-full border border-gray-300 px-5 py-3 font-body placeholder:text-gray-400 outline-none focus:ring-black focus:border-black rounded-lg"
                    placeholder="Email address"
                    type="email"
                    {...register("email")}
                  />
                </>
              ) : (
                <p>
                  {name}, {email}
                </p>
              )}
              <button
                className={clsx(
                  "mt-8 bg-black w-full py-3 text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition",
                  !(email?.length > 0 && name?.length > 0) &&
                    "opacity-40 hover:bg-black",
                  isSubmitting && "bg-[#D7D7D8] hover:bg-[#D7D7D8]",
                )}
              >
                {!isSubmitting ? (
                  <>
                    <span className="opacity-60">Buy for</span> 300 USDC
                  </>
                ) : (
                  <>
                    <Spinner />
                    <span className="text-black ml-2">
                      Waiting for transaction...
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
