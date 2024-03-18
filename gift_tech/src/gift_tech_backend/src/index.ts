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
  nat,
} from "azle";

import { toHex } from "viem/utils";
import { computeAddress } from "ethers";

import { getPublicKeyResult } from "./signing";
import { getTweetContent } from "./tweet";
import { getTransactionCount } from "./rpc";
import { prepareTransaction } from "./tranasction";

const PublicKey = Record({
  publicKey: blob,
  publicKeyString: text,
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

/* Canister declaration */
export default Canister({
  // prepareTx: update([], text, async () => {
  //   return prepareTransaction(
  //     "0x42B28394076DDa20137485da77E59387e14D922D",
  //     "0xDc70E66794fE4879eb59DF344110AD93AfB0AeBa",
  //     "2"
  //   );
  // }),
  transactionCount: update([text], nat, async (address) => {
    return BigInt(await getTransactionCount(address as `0x${string}`));
  }),
  publicKey: update([], PublicKey, async () => {
    const publicKeyResult = await getPublicKeyResult();

    return {
      publicKey: publicKeyResult.public_key,
      publicKeyString: toHex(publicKeyResult.public_key),
      address: computeAddress(toHex(publicKeyResult.public_key)),
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

      return prepareTransaction(
        receiverAddress as `0x${string}`,
        giftToClaim.tokenAddress as `0x${string}`,
        giftToClaim.tokenId
      );
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
