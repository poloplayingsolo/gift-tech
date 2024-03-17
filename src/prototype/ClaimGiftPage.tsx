import { useAccount } from "wagmi";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNFTs, type NFT } from "@/hooks/useNFTs";
import { useSendNFTToCanister } from "@/hooks/useSendNFTToCanister";
import { canister } from "@/canister";

function WalletNotConnectedState() {
  return (
    <div>
      <div>Your wallet is not connected</div>
      <ConnectButton />
    </div>
  );
}

function WalletConnectedState() {
  const nfts = useNFTs();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [xHandle, setXHandle] = useState("");

  const [sendNFT, sendNFTLoading] = useSendNFTToCanister(
    selectedNFT
      ? {
          contractAddress: selectedNFT.contractAddress,
          id: selectedNFT.id,
        }
      : undefined
  );

  return (
    <div>
      <div>Your wallet connected</div>
      <ConnectButton />
      <div className="mt-5">
        <Select
          onValueChange={(key) => {
            const nft = nfts.find((nft) => nft.key === key);
            if (!nft) return;
            setSelectedNFT(nft);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {nfts.map((nft) => (
              <SelectItem key={nft.id} value={nft.key}>
                <div className="flex">
                  <img
                    width={20}
                    height={20}
                    alt={nft.id.toString()}
                    src={nft.imageUrl}
                  />
                  <div className="ml-1">Address: {nft.contractAddress}</div>
                  <div className="ml-1">ID: {nft.id.toString()}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input className="mt-5" placeholder="input twitter handle" />
        <Input className="mt-5" placeholder="input wishes" />
        <Button
          disabled={sendNFTLoading}
          onClick={async () => {
            if (!selectedNFT || !xHandle) return;

            await sendNFT();
            await canister.pushGift(
              selectedNFT.contractAddress,
              selectedNFT.id,
              xHandle
            );
          }}
          className="mt-5"
        >
          Create
        </Button>
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
