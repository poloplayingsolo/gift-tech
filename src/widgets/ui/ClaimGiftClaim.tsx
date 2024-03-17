import { useEffect, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { useHistoryState } from "wouter/use-browser-location";
import type { NFT } from "@/hooks/useAccountNFTs";
import { alchemy } from "@/alchemy";
import { canister } from "@/canister";

export function ClaimGiftClaim() {
  const state = useHistoryState<{
    postURL: string;
    xHandle: string;
    contractAddress: `0x${string}`;
    tokenId: bigint;
  }>();

  const [claimed, setClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [nft, setNFT] = useState<NFT | null>(null);

  const claim = async () => {
    const splitted = state.postURL.split("/");
    const postId = splitted[splitted.length - 1];

    setClaiming(true);
    await canister.claimGift(
      state.contractAddress,
      state.tokenId,
      state.xHandle,
      postId
    );

    setClaiming(false);
    setClaimed(true);
  };

  const fetchNFTMetadata = useCallback(async () => {
    const metadata = await alchemy.nft.getNftMetadata(
      state.contractAddress,
      state.tokenId
    );

    setNFT({
      id: metadata.contract.address + metadata.tokenId,
      tokenId: BigInt(metadata.tokenId),
      imageUrl: metadata.image.pngUrl,
      contractAddress: metadata.contract.address as `0x${string}`,
      name: metadata.name,
    });
  }, [state]);

  useEffect(() => {
    fetchNFTMetadata();
  }, [fetchNFTMetadata]);

  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white sm:rounded-lg">
          <div className="border-b custom-card px-4 py-5 sm:px-6">
            <div className="">
              <h2 className="scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight first:mt-0">
                Congratulations 🎉
              </h2>
              <div className="border-b white-card p-3 mx-auto max-w-56 mt-5 center">
                <img
                  className="inline"
                  src={nft?.imageUrl}
                  alt="nft"
                />
              </div>
              <h4 className="scroll-m-20 text-xl mt-3 font-semibold tracking-tight">
                You got {nft?.name} #{nft?.tokenId.toString()}
              </h4>
              <div className="border-b white-card text-left px-4 mt-5 py-5 sm:px-6">
                Hi, {state.xHandle} <br />
                <br />I gift you this {nft?.name} #{nft?.tokenId.toString()}
                <br />
                wishes
              </div>

              <div className="flex mt-4 space-x-2">
                <Button
                  onClick={() => {
                    claim();
                  }}
                  type="submit"
                  className="w-full"
                  disabled={claimed || claiming}
                >
                  {claimed
                    ? "Claimed! Check out your wallet 🎉"
                    : claiming
                      ? "Loading..."
                      : "Claim"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
