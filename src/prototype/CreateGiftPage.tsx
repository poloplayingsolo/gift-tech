import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function WalletNotConnectedState() {
  return (
    <div>
      <div>Your wallet is not connected</div>
      <ConnectButton />
    </div>
  );
}

function WalletConnectedState() {
  return (
    <div>
      <div>Your wallet connected</div>
      <ConnectButton />
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function CreateGiftPage() {
  const { isConnected } = useAccount();

  return (
    <div className="p-5">
      <h1>Create Gift</h1>
      {isConnected ? <WalletConnectedState /> : <WalletNotConnectedState />}
    </div>
  );
}
