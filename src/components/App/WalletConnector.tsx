"use client";

import { useConnect } from "wagmi";
import Button from "../UI/Button";

export function WalletConnector() {
  const { connectors, connect } = useConnect();
  const mainConnector = connectors[0];

  return (
    <Button
      onClick={() => connect({ connector: mainConnector })}
      size="lg"
      color="accent"
    >
      Connect your Wallet
    </Button>
  );
}
