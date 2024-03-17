import { alchemy } from "@/alchemy";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface NFT {
  key: string;
  imageUrl?: string;
  id: bigint;
  contractAddress: `0x${string}`;
}

export function useNFTs(): NFT[] {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const account = useAccount();

  async function fetchNfts() {
    if (!account.address) return;

    const nfts = await alchemy.nft.getNftsForOwner(account.address);

    const newNftsState: NFT[] = [];

    // Print contract address and tokenId for each NFT:
    for (const nft of nfts.ownedNfts) {
      newNftsState.push({
        key: nft.contract.address + nft.tokenId,
        imageUrl: nft.image.pngUrl,
        id: BigInt(nft.tokenId),
        contractAddress: nft.contract.address as `0x${string}`,
      });
    }

    setNfts(newNftsState);
  }

  useEffect(() => {
    fetchNfts();
  }, []);

  return nfts;
}
