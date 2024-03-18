import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'claimGift' : ActorMethod<[string, string], string>,
  'createGift' : ActorMethod<
    [string, string, string, bigint],
    {
      'tokenId' : bigint,
      'tokenAddress' : string,
      'createdAt' : bigint,
      'message' : string,
      'receiver' : string,
    }
  >,
  'publicKey' : ActorMethod<[], { 'publicKey' : Uint8Array | number[] }>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
