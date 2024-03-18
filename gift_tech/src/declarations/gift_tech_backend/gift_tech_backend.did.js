export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'claimGift' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'createGift' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat64],
        [
          IDL.Record({
            'tokenId' : IDL.Nat64,
            'tokenAddress' : IDL.Text,
            'createdAt' : IDL.Nat64,
            'message' : IDL.Text,
            'receiver' : IDL.Text,
          }),
        ],
        [],
      ),
    'publicKey' : IDL.Func(
        [],
        [IDL.Record({ 'publicKey' : IDL.Vec(IDL.Nat8) })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
