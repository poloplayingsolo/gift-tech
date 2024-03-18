// const delay = () => new Promise((r) => setTimeout(r, 4000));
import { createActor } from "../gift_tech/src/declarations/gift_tech_backend";
import { alchemy } from "./alchemy";

const actorPromise = createActor("35fg3-taaaa-aaaak-afpza-cai", {
  agentOptions: {
    host: "https://ic0.app",
    logToConsole: true,
  },
});

class Canister {
  // get evm address of the canister to send NFT
  async getEvmAddress(): Promise<`0x${string}`> {
    const actor = await actorPromise;
    const publicKeyResponse = await actor.publicKey();

    return publicKeyResponse.address as `0x${string}`;
  }

  // set NFT ID -> x handle
  async pushGift(
    contractAddress: string,
    tokenId: bigint,
    xHandle: string,
    wishes: string
  ) {
    const actor = await actorPromise;
    const createdGift = await actor.createGift(
      xHandle.slice(1),
      wishes,
      contractAddress,
      tokenId.toString()
    );

    console.log(
      "GIFT CREATED",
      xHandle.slice(1),
      wishes,
      contractAddress,
      tokenId.toString()
    );

    return createdGift;
  }

  async claimGift(
    contractAddress: string,
    tokenId: bigint,
    xHandle: string,
    postId: string
  ) {
    const actor = await actorPromise;
    const tweetText = await fetch(
      `https://goldfish-app-shmeu.ondigitalocean.app/content/${xHandle.slice(1)}/${postId}`
    ).then((res) => res.text());

    const nonce = await alchemy.core.getTransactionCount(
      await this.getEvmAddress()
    );

    console.log("NONCE", nonce);
    console.log("TWEET TEXT", tweetText);

    const claimTx = await actor.claimGift(
      xHandle.slice(1),
      postId,
      contractAddress,
      tokenId.toString(),
      nonce.toFixed(),
      tweetText
    );

    console.log(
      "GIFT CLAIMED",
      xHandle.slice(1),
      postId,
      contractAddress,
      tokenId
    );
    console.log("CLAIM TX", claimTx);

    const response = await alchemy.core.sendTransaction(claimTx);

    console.log("CLAIM TX RESPONSE", response);
  }
}

export const canister = new Canister();
