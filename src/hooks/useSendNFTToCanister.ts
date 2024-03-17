import { canister } from "@/canister";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

interface SendNFTPayload {
  contractAddress: `0x${string}`;
  id: bigint;
}

// returns function to send nft and loading state
export function useSendNFTToCanister(
  payload?: SendNFTPayload
): [() => Promise<unknown>, boolean] {
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
    async () => {
      if (
        !payload?.contractAddress ||
        typeof payload.id !== "bigint" ||
        !canisterEvmAddress
      )
        return;

      return writeContractAsync({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        address: payload.contractAddress,
        functionName: "transferFrom",
        args: [account.address, canisterEvmAddress, payload.id],
      });
    },
    status === "pending",
  ];
}
