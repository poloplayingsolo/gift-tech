import { alchemy } from "@/alchemy";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface NFT {
  id: string;
  imageUrl?: string;
  name?: string;
  tokenId: bigint;
  contractAddress: `0x${string}`;
}

export function useAccountNFTs(): NFT[] {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const account = useAccount();

  async function fetchNfts() {
    if (!account.address) return;

    const nfts = await alchemy.nft.getNftsForOwner(account.address);

    const newNftsState: NFT[] = [];

    for (const nft of nfts.ownedNfts) {
      newNftsState.push({
        id: nft.contract.address + nft.tokenId,
        imageUrl: nft.image.pngUrl,
        tokenId: BigInt(nft.tokenId),
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
