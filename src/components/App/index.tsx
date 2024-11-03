"use client";

import { useAccount } from "wagmi";
import { WalletConnector } from "./WalletConnector";
import DepositWithdraw from "./DepositWithdraw";
import useMounted from "@/hooks";

export default function App() {
  const isMounted = useMounted();
  const { isConnected } = useAccount();

  if (!isMounted) return null;

  return (
    <div className="h-full w-full flex items-center justify-center px-40 pt-16">
      {isConnected ? (
        <DepositWithdraw />
      ) : (
        <div className="w-full h-full flex flex-col items-center gap-16">
          <div className="flex items-center mt-16 gap-1 text-[68px] font-bold text-orange-400">
            Happy Halloween 🎃
          </div>
          <WalletConnector />
        </div>
      )}
    </div>
  );
}
