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

/**
 * @todo
 * - add tweet parsing logic
 * - add transaction signing logic
 * - add rpc send_raw_tx logic
 * - add token balance logic
 */

const PublicKey = Record({
  publicKey: blob,
});

const Gift = Record({
  createdAt: nat64,
  receiver: text,
  message: text,
  tokenAddress: text,
  tokenId: nat64,
});

type Gift = typeof Gift.tsType;
type TwitterHandle = text;

/* Persistant state */
const GIFTS_MAP_ID = 0;
const usersGiftsState = StableBTreeMap<TwitterHandle, Vec<Gift>>(GIFTS_MAP_ID);

/* Canister declaration */
export default Canister({
  publicKey: update([], PublicKey, async () => {
    const publicKeyResult = await getPublicKeyResult();
    return {
      publicKey: publicKeyResult.public_key,
    };
  }),
  claimGift: update([text, text], text, async (twitterHandle, tweetId) => {
    const userGifts = usersGiftsState.get(twitterHandle);
    if ("None" in userGifts) {
      return ic.trap("User does not exist");
    } // check if user exists

    const { giftReceiverAddress, giftIndex } = await getTweetContent(
      twitterHandle,
      tweetId
    );

    const giftToClaim = userGifts.Some[giftIndex];
    if (!giftToClaim) {
      return ic.trap("Gift does not exist");
    } // check if gift exists

    /* Implement transaction signing and send of the gift here... */

    return `Sending Gift to ${giftReceiverAddress}: ${giftToClaim.message}, ${giftToClaim.tokenAddress}, ${giftToClaim.tokenId}`; //tx hash
  }),
  createGift: update(
    [text, text, text, nat64],
    Gift,
    (
      twitterHandle: text,
      message: text,
      tokenAddress: text,
      tokenId: nat64
    ) => {
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