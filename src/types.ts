import { BigNumberish } from "ethers";

export type Transaction = {
  hash: string;
  value: BigNumberish;
  to: string;
  confirmations: number;
};
