import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CreateGiftConnectWallet() {
  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Connect Wallet to continue</h3>
            <p className="mt-1 text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
            </p>
            <div className="mt-5">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
