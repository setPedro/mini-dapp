import { capitalizeFirstLetter, cn } from "@/lib";
import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "../../UI/Button";

type TxInputProps = {
  action: "deposit" | "withdraw";
  amount: number | "";
  setAmount: Dispatch<SetStateAction<number | "">>;
  available?: string;
  onSubmitted: (amount: number) => void;
};

export default function TxInput({
  action,
  available,
  onSubmitted,
}: TxInputProps) {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onSubmitted(numAmount);
      setAmount("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setAmount("");
      return;
    }

    // Only allow numeric input with one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-6 rounded-md">
      <div className="w-full flex items-center justify-between">
        <h3 className={cn("text-xl font-bold")}>
          {capitalizeFirstLetter(action)}
        </h3>
        {available && (
          <span className="text-xs text-gray-500">Avail.: {available} ETH</span>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={amount}
          onChange={handleInputChange}
          placeholder={`Enter ${action} amount`}
          className="text-background font-semibold px-6 py-4 rounded-md rounded-r-none w-full outline-none focus:opacity-70 hover:opacity-70"
        />

        <Button
          onClick={handleSubmit}
          size={"md"}
          color={action}
          className={cn("rounded-l-none")}
          disabled={!amount || isNaN(parseFloat(amount))}
        >
          {capitalizeFirstLetter(action)}
        </Button>
      </div>
    </div>
  );
}
