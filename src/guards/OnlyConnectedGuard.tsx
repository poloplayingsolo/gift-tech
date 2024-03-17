import React, { type PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import { Redirect } from "wouter";

export function OnlyConnectedGuard({ children }: PropsWithChildren) {
  const account = useAccount();

  return account.isConnected ? children : <Redirect href="/" />;
}
