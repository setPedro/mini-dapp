"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import Button from "./UI/Button";
import { formatAddress } from "@/lib";
import { useEffect, useState } from "react";
import { Modal } from "./UI/Modal";
import Link from "next/link";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected: accountConnected, address } = useAccount();

  useEffect(() => {
    setIsConnected(accountConnected);
  }, [accountConnected]);

  const handleWalletClick = () => {
    isConnected ? setIsModalOpen(true) : connect({ connector: connectors[0] });
  };

  const handleDisconnect = () => {
    disconnect();
    setIsModalOpen(false);
  };

  if (!isConnected) return null;

  return (
    <div className="w-full flex items-center justify-between py-4 md:py-6 px-4 sm:px-9">
      <Link
        href="/"
        className="flex items-center gap-1 text-lg font-bold text-orange-400"
      >
        Happy Halloween <span className="text-3xl">🎃</span>
      </Link>

      <Button onClick={handleWalletClick} size="md" color="accent">
        {formatAddress(address)}
      </Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Button onClick={handleDisconnect} size="md" color="primary">
            Disconnect Wallet
          </Button>
        </Modal>
      )}
    </div>
  );
}
