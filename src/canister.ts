const delay = () => new Promise((r) => setTimeout(r, 4000));

class Canister {
  // get evm address of the canister to send NFT
  async getEvmAddress(): Promise<`0x${string}`> {
    await delay();
    return "0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A";
  }

  // set NFT ID -> x handle
  async pushGift(contractAddress: string, id: bigint, xHandle: string) {
    console.log("GIFT PUSHED", contractAddress, id, xHandle);
    await delay();
  }
}

export const canister = new Canister();
