import { useAccount } from "wagmi";
import { Redirect } from "wouter";

import { Header } from "@/components/ui/Header";
import { CreateGiftChooseAsset } from "@/widgets/ui/CreateGiftChooseAsset";
import { Partners } from "@/components/ui/partners";

export function CreateGiftChooseAssetPage() {
  const account = useAccount();

  if (!account.isConnected) return <Redirect href="/" />;

  return (
    <div className="vh-100">
      <Header />
      <div className="mx-auto w-full items-justify-center center mt-10">
        <div className="text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Create your GIFT
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 mx-auto max-w-2xl">
            My Web3 Bro, now you able to create a gift for your Web2 Normis and
            make him a new Web3 Bro. Non-custodial, permissionless.
          </p>
          <CreateGiftChooseAsset />
          <Partners />
        </div>
      </div>
    </div>
  );
}
