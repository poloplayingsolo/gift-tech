import * as secp from "@noble/secp256k1";
import { computeAddress } from "ethers";
import {
  encodeFunctionData,
  erc721Abi,
  hexToBytes,
  keccak256,
  numberToHex,
  parseGwei,
  recoverAddress,
  serializeTransaction,
  signatureToHex,
  toHex,
} from "viem";

import { getPublicKeyResult, getSignatureResult } from "./signing";
import { getTransactionCount } from "./rpc";

export async function prepareTransaction(
  to: `0x${string}`,
  tokenAddress: `0x${string}`,
  tokenId: string,
  nonce: number
) {
  const publicKeyResult = await getPublicKeyResult();
  const fromAddress = computeAddress(
    toHex(publicKeyResult.public_key)
  ) as `0x${string}`;

  const data = encodeFunctionData({
    abi: erc721Abi,
    functionName: "transferFrom",
    args: [fromAddress, to, BigInt(tokenId)],
  });

  const transactionData = {
    chainId: 137,
    to: tokenAddress as any,
    data,
    value: 0n,
    gas: 200000n,
    gasPrice: parseGwei("150"),
    nonce, //await getTransactionCount(fromAddress),
  };

  const transaction = serializeTransaction({ ...transactionData });
  const hash = keccak256(transaction as `0x${string}`);
  const { signature } = await getSignatureResult(hexToBytes(hash));

  const decodeSignature = secp.Signature.fromCompact(signature);
  const r = numberToHex(decodeSignature.r, { size: 32 });
  const s = numberToHex(decodeSignature.s, { size: 32 });
  const v = 137n * 2n + 35n;

  const sigA = {
    r,
    s,
    v,
    yParity: 0,
  };

  const sigB = {
    r,
    s,
    v: v + 1n,
    yParity: 0,
  };

  const addressA = await recoverAddress({
    hash,
    signature: signatureToHex(sigA),
  });

  const finalSig = addressA === fromAddress ? sigA : sigB;

  return serializeTransaction(
    {
      ...transactionData,
    },
    finalSig
  );
}
