import React, { useState } from "react";
import TxInput from "./TxInput";
import RecentTransactions from "./RecentTransactions";

export default function DepositWithdraw() {
  const [depositAmount, setDepositAmount] = useState<number | "">(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number | "">(0);

  function handleDeposit(amount: number) {
    console.log("deposited: ", amount);
  }
  function handleWithdraw(amount: number) {
    console.log("withdrawed: ", amount);
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 border-2 border-accent border-b-0 rounded-t-3xl py-6 px-10 bg-foreground">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wallet</h1>
        <p className="text-2xl font-bold opacity-70">0.0000 ETH</p>
      </div>
      <div className="flex flex-col w-full gap-8 px-6">
        <TxInput
          action="deposit"
          amount={depositAmount}
          setAmount={setDepositAmount}
          onSubmitted={handleDeposit}
        />
        <TxInput
          action="withdraw"
          amount={withdrawAmount}
          setAmount={setWithdrawAmount}
          available="0.0000"
          onSubmitted={handleWithdraw}
        />
      </div>
      <div className="w-full px-6">
        <RecentTransactions />
      </div>
    </div>
  );
}
