const delay = () => new Promise((r) => setTimeout(r, 4000));

class Canister {
  // get evm address of the canister to send NFT
  async getEvmAddress(): Promise<`0x${string}`> {
    await delay();
    return "0xF8aEF0FC476E9B34bAED3A660C1901f2dBcDaCdE";
  }

  // set NFT ID -> x handle
  async pushGift(
    contractAddress: string,
    tokenId: bigint,
    xHandle: string,
    wishes: string
  ) {
    console.log("GIFT PUSHED", contractAddress, tokenId, xHandle, wishes);
    await delay();
  }

  async claimGift(
    contractAddress: string,
    tokenId: bigint,
    xHandle: string,
    postId: string,
  ) {
    console.log("GIFT CLAIMED", contractAddress, tokenId, xHandle, postId);
    await delay();
  }
}

export const canister = new Canister();
