import {
  text,
  blob,
  nat64,
  update,
  Canister,
  Vec,
  Record,
  StableBTreeMap,
  ic,
} from "azle";

import { getPublicKeyResult } from "./signing";
import { getTweetContent } from "./tweet";

import { publicKeyToAddress, toHex } from "viem/utils";

/**
 * @todo
 * - [x] add tweet parsing logic
 * - add transaction signing logic
 * - add rpc send_raw_tx logic
 * - add token balance logic
 */

const PublicKey = Record({
  publicKey: blob,
  address: text,
});

const Gift = Record({
  createdAt: nat64,
  receiver: text,
  message: text,
  tokenAddress: text,
  tokenId: text,
});

type Gift = typeof Gift.tsType;
type TwitterHandle = text;

/* Persistant state */
const GIFTS_MAP_ID = 0;
const usersGiftsState = StableBTreeMap<TwitterHandle, Vec<Gift>>(GIFTS_MAP_ID);

// const POLYGON_RPC = "https://polygon-bor-rpc.publicnode.com";

/* Canister declaration */
export default Canister({
  publicKey: update([], PublicKey, async () => {
    const publicKeyResult = await getPublicKeyResult();
    const address = publicKeyToAddress(toHex(publicKeyResult.public_key));

    return {
      publicKey: publicKeyResult.public_key,
      address,
    };
  }),
  claimGift: update(
    [text, text, text, text],
    text,
    async (twitterHandle, tweetId, tokenAddress, tokenId) => {
      const userGifts = usersGiftsState.get(twitterHandle);

      if ("None" in userGifts) {
        return ic.trap("User does not exist");
      }

      const { receiverAddress } = await getTweetContent(twitterHandle, tweetId);

      const giftToClaim = userGifts.Some.find(
        (gift) =>
          gift.tokenAddress === tokenAddress &&
          BigInt(gift.tokenId) === BigInt(tokenId)
      );

      if (!giftToClaim) {
        return ic.trap("No such gift for this user");
      }

      /* Implement transaction signing and send of the gift here... */

      return `Sending Gift to ${receiverAddress}: ${giftToClaim.message}, ${giftToClaim.tokenAddress}, ${giftToClaim.tokenId}`; //tx hash
    }
  ),
  createGift: update(
    [text, text, text, text],
    Gift,
    (twitterHandle: text, message: text, tokenAddress: text, tokenId: text) => {
      let userGifts = usersGiftsState.get(twitterHandle);

      /* Add logic for validating that validates the gift is already on our account */

      const gift: Gift = {
        createdAt: BigInt(Date.now()),
        receiver: twitterHandle,
        message,
        tokenAddress,
        tokenId,
      };

      if ("None" in userGifts) {
        usersGiftsState.insert(twitterHandle, [gift]);
      } else {
        usersGiftsState.insert(twitterHandle, userGifts.Some.concat([gift]));
      }

      return gift;
    }
  ),
});
