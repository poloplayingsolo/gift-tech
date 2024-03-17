import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

import { canister } from "@/canister";
import { erc721ABI } from "./constants/erc721ABI";

// returns function to send nft and loading state
export function useSendNFTToCanister(): [
  (contractAddress: `0x${string}`, tokenId: bigint) => Promise<unknown>,
  boolean,
] {
  const { writeContractAsync, status } = useWriteContract();
  const account = useAccount();
  const [canisterEvmAddress, setCanisterEvmAddress] = useState<
    `0x${string}` | null
  >(null);

  async function fetchCanisterEvmAddress() {
    const address = await canister.getEvmAddress();
    setCanisterEvmAddress(address);
  }

  useEffect(() => {
    fetchCanisterEvmAddress();
  }, []);

  return [
    async (contractAddress: `0x${string}`, tokenId: bigint) => {
      if (!canisterEvmAddress) return;

      return writeContractAsync({
        abi: erc721ABI,
        address: contractAddress,
        functionName: "transferFrom",
        args: [account.address, canisterEvmAddress, tokenId],
      });
    },
    status === "pending",
  ];
}
