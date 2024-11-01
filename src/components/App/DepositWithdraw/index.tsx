import React, { useEffect, useState } from "react";
import TxInput from "./TxInput";
import { ethers, TransactionResponse } from "ethers";
import { useAccount } from "wagmi";
import RecentTransactions from "./RecentTransactions";

const CONTRACT_ADDRESS = "0x7642B2b8F5409150E3151167e8b040C46D215aD4";
const ERC20_ABI = [
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function balanceOf(address account) view returns (uint256)",
];

export default function DepositWithdraw() {
  const { address, isConnected } = useAccount();

  const [balance, setBalance] = useState("0.0");
  const [provider, setProvider] = useState<ethers.BrowserProvider>();

  useEffect(() => {
    if (!isConnected) return;

    async function initProvider() {
      const _provider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(_provider);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ERC20_ABI,
        _provider
      );
      const userBalance = await contract.balanceOf(address as string);
      setBalance(Number(ethers.formatEther(userBalance)).toFixed(4));
    }

    initProvider();
  }, [isConnected, address]);

  async function handleDeposit(depositAmount: number) {
    if (!provider) return;
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, signer);
    const tx: TransactionResponse = await contract.deposit({
      value: ethers.parseEther(depositAmount.toString()),
    });
    await tx.wait();

    console.log("Deposit transaction confirmed:", tx);
    updateBalance();
  }

  async function handleWithdraw(withdrawAmount: number) {
    if (!provider) return;
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, signer);

    const tx: TransactionResponse = await contract.withdraw(
      ethers.parseEther(withdrawAmount.toString())
    );
    await tx.wait();
    console.log("Withdrawn:", tx);
    updateBalance();
  }

  async function updateBalance() {
    if (!provider) return;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, provider);
    const userBalance = await contract.balanceOf(address as string);
    console.log(userBalance);
    setBalance(Number(ethers.formatEther(userBalance)).toFixed(4));
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 border-2 border-accent border-b-0 rounded-t-3xl py-6 px-10 bg-foreground">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wallet</h1>
        <p className="text-2xl font-bold opacity-70">{balance} ETH</p>
      </div>
      <div className="flex flex-col w-full gap-8 px-6">
        <TxInput action="deposit" onSubmitted={handleDeposit} />
        <TxInput
          action="withdraw"
          available={balance}
          onSubmitted={handleWithdraw}
        />
      </div>
      <div className="w-full px-6">
        {/* <RecentTransactions address={address} provider={provider} /> */}
      </div>
    </div>
  );
}
