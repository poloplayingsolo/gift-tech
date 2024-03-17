import { ConnectButton } from "@/ConnectButton";

export function CreateGiftConnectWallet() {
  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Connect Wallet to continue
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              You can use ERC721 token on Polygon blockchain from your balance
              to wrap a claimable gift and send to your friend’s email or X.
            </p>
            <div className="mt-5">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
