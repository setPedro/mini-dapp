import { ethers } from "ethers";
import { Transaction } from "./types";

export const mockTransactions: Transaction[] = [
  {
    hash: "0x123abc456def7890ghijklmnop1234567890abcdef1234567890abcdef1234",
    value: ethers.parseEther("0.5"),
    to: "0xabcdef1234567890ghijklmnop1234567890abcdef",
    confirmations: 12,
  },
  {
    hash: "0x987zyx654wvu3210fedcba9876543210fedcba9876543210fedcba9876543",
    value: ethers.parseEther("1.2"),
    to: "0x1234567890abcdefabcdef1234567890abcdef",
    confirmations: 0,
  },
  {
    hash: "0xabc123456def7890ghijklmnop9876543210abcdef1234567890abcdefabcd",
    value: ethers.parseEther("2.0"),
    to: "0x567890abcdefabcdef1234567890abcdefabcdef",
    confirmations: 5,
  },
];
