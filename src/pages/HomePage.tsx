import { useAccount } from "wagmi";
import { Link } from 'wouter'
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function HomePage() {
  const account = useAccount();

  return (
    <div className="p-5">
      <div>{account.address ?? "No address, connect wallet"}</div>
      <div className="mt-5">
        <ConnectButton />
      </div>
      <div className="mt-5">
        <Link href="/other">Link to other page</Link>
      </div>
    </div>
  );
}
