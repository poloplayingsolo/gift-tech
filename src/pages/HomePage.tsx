import { useAccount } from "wagmi";
import { Link } from 'wouter'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";

export function HomePage() {
  const account = useAccount();
  const { login, isAuthenticated, logout, user } = useKindeAuth();

  return (
    <div className="p-5">
      <div>{account.address ?? "No address, connect wallet"}</div>
      <div>User: {JSON.stringify(user)}</div>
      <div className="mt-5">
        <ConnectButton />
      </div>
      <div className="mt-5">
        {isAuthenticated ? (
          <div>
            <div>Authenticated</div>
            <Button onClick={() => logout()}>Log out</Button>
          </div>
        ) : (
          <Button onClick={() => login()}>Sign in with X</Button>
        )}
      </div>
      <div className="mt-5">
        <Link href="/other">Link to other page</Link>
      </div>
    </div>
  );
}
