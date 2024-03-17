import { None, Some, ic } from "azle";
import { managementCanister } from "azle/canisters/management";

const TWEET_REGEX = /GiftTech (0x[A-f0-9]{40}):(1)/g; // GiftTech 0xblabalbal:1
const TWEET_PARSER_URL =
  "https://goldfish-app-shmeu.ondigitalocean.app/content";

async function fetchTweetContent(twitterHandle: string, tweetId: string) {
  const response = await ic.call(managementCanister.http_request, {
    args: [
      {
        url: `${TWEET_PARSER_URL}/${twitterHandle}/${tweetId}`,
        max_response_bytes: Some(2_000n),
        method: {
          get: null,
        },
        headers: [],
        body: None,
        transform: None,
      },
    ],
    cycles: 50_000_000n,
  });

  return Buffer.from(response.body).toString("utf-8");
}

export async function getTweetContent(twitterHandle: string, tweetId: string) {
  const tweetContent = await fetchTweetContent(twitterHandle, tweetId);

  const execResult = TWEET_REGEX.exec(tweetContent);
  if (execResult === null || execResult.length != 3) {
    return ic.trap("Invalid tweet content");
  }

  return {
    giftReceiverAddress: execResult[1],
    giftIndex: Number(execResult[2]),
  };
}
