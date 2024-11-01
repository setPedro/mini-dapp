import { useEffect, useState, useCallback } from "react";
import { ethers, Contract } from "ethers";
import { useAccount } from "wagmi";
import TxInput from "./TxInput";

const CONTRACT_ADDRESS = "0x7642B2b8F5409150E3151167e8b040C46D215aD4";
const ERC20_ABI = [
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function balanceOf(address account) view returns (uint256)",
];

export default function DepositWithdraw() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [balance, setBalance] = useState("0.0000");
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (!isConnected || !address) return;

    const initContract = async () => {
      const newProvider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(newProvider);

      const newContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ERC20_ABI,
        newProvider
      );

      setContract(newContract);

      const userBalance = await newContract.balanceOf(address);
      setBalance(Number(ethers.formatEther(userBalance)).toFixed(4));
    };

    initContract();
  }, [isConnected, address]);

  const updateBalance = useCallback(async () => {
    if (!contract || !address) return;
    const userBalance = await contract.balanceOf(address);
    setBalance(Number(ethers.formatEther(userBalance)).toFixed(4));
  }, [contract, address]);

  const handleTransaction = useCallback(
    async (action: "deposit" | "withdraw", amount: number) => {
      if (!contract || !provider) return;
      const signer = await provider.getSigner();
      const signedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ERC20_ABI,
        signer
      );

      const tx = await (action === "deposit"
        ? signedContract.deposit({
            value: ethers.parseEther(amount.toString()),
          })
        : signedContract.withdraw(ethers.parseEther(amount.toString())));

      await tx.wait();
      await updateBalance();
      // FIXME: refactor this shit. Unify everywhere
      setDepositAmount("");
      setWithdrawAmount("");
    },
    [contract, provider, updateBalance]
  );

  if (!isConnected) return null;

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 border-2 border-accent border-b-0 rounded-t-3xl py-6 px-10 bg-foreground">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wallet</h1>
        <p className="text-2xl font-bold opacity-70">{balance} ETH</p>
      </div>

      <div className="flex flex-col w-full gap-8 px-6">
        <TxInput
          action="deposit"
          amount={depositAmount}
          setAmount={setDepositAmount}
          onSubmitted={(amount) => handleTransaction("deposit", amount)}
        />
        <TxInput
          action="withdraw"
          available={balance}
          amount={withdrawAmount}
          setAmount={setWithdrawAmount}
          onSubmitted={(amount) => handleTransaction("withdraw", amount)}
        />
      </div>
    </div>
  );
}
