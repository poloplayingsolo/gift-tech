export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'claimGift' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'createGift' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'tokenId' : IDL.Text,
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
        [
          IDL.Record({
            'publicKeyString' : IDL.Text,
            'publicKey' : IDL.Vec(IDL.Nat8),
            'address' : IDL.Text,
          }),
        ],
        [],
      ),
    'transactionCount' : IDL.Func([IDL.Text], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
