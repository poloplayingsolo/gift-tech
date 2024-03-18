import { None, Some, ic } from "azle";
import { managementCanister } from "azle/canisters/management";

/**
 * Tweet content example:
 * I am claiming gift to 0x1234567890123456789012345678901234567890
 */
const TWEET_REGEX = /I am claiming gift to (0x[A-f0-9]{40})/g;
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
    cycles: 100_000_000n,
  });

  return Buffer.from(response.body).toString("utf-8");
}

export async function getTweetContent(
  twitterHandle: string,
  tweetId: string,
  tweetContent: string
) {
  // const tweetContent = await fetchTweetContent(twitterHandle, tweetId);

  const execResult = TWEET_REGEX.exec(tweetContent);
  if (execResult === null || execResult.length != 2) {
    return ic.trap("Tweet is weird");
  }

  return {
    receiverAddress: execResult[1],
  };
}
