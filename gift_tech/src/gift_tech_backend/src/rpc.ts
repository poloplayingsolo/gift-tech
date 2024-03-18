import { None, Some, ic } from "azle";
import { managementCanister } from "azle/canisters/management";
import { hexToNumber } from "viem";

const POLYGON_RPC = "https://polygon-bor-rpc.publicnode.com";

export async function getTransactionCount(address: `0x${string}`) {
  const call = await ic.call(managementCanister.http_request, {
    args: [
      {
        url: POLYGON_RPC,
        max_response_bytes: Some(2_000n),
        method: {
          post: null,
        },
        headers: [],
        body: Some(
          Buffer.from(
            JSON.stringify({
              jsonrpc: "2.0",
              method: "eth_getTransactionCount",
              params: [address, "latest"],
              id: 1,
            }),
            "utf-8"
          )
        ),
        transform: None,
      },
    ],
    cycles: 50_000_000n,
  });

  return hexToNumber(
    JSON.parse(Buffer.from(call.body.buffer).toString("utf-8")).result
  );
}
