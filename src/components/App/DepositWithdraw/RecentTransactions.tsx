import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { mockTransactions } from "@/mocks";
import { formatAddress } from "@/lib";

type RecentTransactionsProps = {
  address: `0x${string}` | undefined;
  provider: ethers.BrowserProvider | undefined;
};

export default function RecentTransactions({
  address,
  provider,
}: RecentTransactionsProps) {
  // const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!address || !provider) return;

    const fetchTransactions = async () => {
      // TODO: implement get transaction history
      // const history = await provider.getHistory(address);
      // setTransactions(history);
    };

    fetchTransactions();
  }, [address, provider]);

  return (
    <div className="w-full flex flex-col gap-8 p-6 bg-background rounded-md">
      <h2 className="w-full text-xl font-bold">Recent Transactions</h2>
      <ul>
        {mockTransactions.map((tx, idx) => (
          <li key={idx}>
            <p>Tx Hash: {formatAddress(tx.hash)}</p>
            <p>Amount: {ethers.formatEther(tx.value)} ETH</p>
            <p>To: {tx.to}</p>
            <p>Status: {tx.confirmations > 0 ? "Confirmed" : "Pending"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
