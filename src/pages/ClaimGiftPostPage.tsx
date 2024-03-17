import { Partners } from "@/components/ui/partners";
import { Header } from "@/components/ui/Header";
import { ClaimGiftPost } from "@/widgets/ui/ClaimGiftPost";

export function ClaimGiftPostPage() {
  return (
    <div className="vh-100">
      <Header />
      <div className="mx-auto w-full items-justify-center center mt-10">
        <div className="text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Claim your GIFT
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Short pitch here.
          </p>
          <ClaimGiftPost />
          <Partners />
        </div>
      </div>
    </div>
  );
}
