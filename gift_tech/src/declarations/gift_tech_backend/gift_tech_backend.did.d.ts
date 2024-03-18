import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'claimGift' : ActorMethod<
    [string, string, string, string, string, string],
    string
  >,
  'createGift' : ActorMethod<
    [string, string, string, string],
    {
      'tokenId' : string,
      'tokenAddress' : string,
      'createdAt' : bigint,
      'message' : string,
      'receiver' : string,
    }
  >,
  'publicKey' : ActorMethod<
    [],
    {
      'publicKeyString' : string,
      'publicKey' : Uint8Array | number[],
      'address' : string,
    }
  >,
  'transactionCount' : ActorMethod<[string], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
