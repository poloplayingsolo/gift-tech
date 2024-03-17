import { ic, None } from "azle";
import { managementCanister } from "azle/canisters/management";

const keyName = "dfx_test_key";

export async function getPublicKeyResult() {
  const caller = ic.caller().toUint8Array();

  return ic.call(managementCanister.ecdsa_public_key, {
    args: [
      {
        canister_id: None,
        derivation_path: [caller],
        key_id: {
          curve: { secp256k1: null },
          name: keyName,
        },
      },
    ],
  });
}

export async function getSignatureResult(messageHash: Uint8Array) {
  const caller = ic.caller().toUint8Array();

  return ic.call(managementCanister.sign_with_ecdsa, {
    args: [
      {
        message_hash: messageHash,
        derivation_path: [caller],
        key_id: {
          curve: { secp256k1: null },
          name: keyName,
        },
      },
    ],
    cycles: 10_000_000_000n,
  });
}
