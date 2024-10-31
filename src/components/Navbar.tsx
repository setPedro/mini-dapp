"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import Button from "./UI/Button";
import { formatAddress } from "@/lib";
import { useEffect, useState } from "react";
import { Modal } from "./UI/Modal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected: accountConnected, address } = useAccount();

  useEffect(() => {
    setIsConnected(accountConnected);
  }, [accountConnected]);

  const mainConnector = connectors[0];

  return (
    <div className="w-full flex items-center justify-between py-4 md:py-6 px-4 sm:px-9">
      <div className="flex items-center gap-1 text-lg font-bold text-orange-400">
        {isConnected && (
          <>
            Happy Halloween <span className="text-3xl">🎃</span>
          </>
        )}
      </div>
      {isConnected && (
        <Button
          onClick={() =>
            isConnected
              ? setIsModalOpen(true)
              : connect({ connector: mainConnector })
          }
          size="md"
          color="accent"
        >
          {isConnected ? formatAddress(address) : "Connect Wallet"}
        </Button>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} className="">
          <Button
            onClick={() => {
              disconnect();
              setIsModalOpen(false);
            }}
            size="md"
            color="primary"
          >
            Disconnect Wallet
          </Button>
        </Modal>
      )}
    </div>
  );
}
