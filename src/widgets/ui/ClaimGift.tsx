import { Button } from "@/components/ui/button"

export function ClaimGift() {
  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white sm:rounded-lg">
          <div className="border-b custom-card px-4 py-5 sm:px-6">
            <div className="">
              <div className="border-b white-card text-left px-4 py-5 sm:px-6">
                <div className="flex flex-row">
                  <img className="inline mr-3  mt-1 self-start" src="/x-black-bg.svg" />
                  <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Hi, @PLuchkovskyi !</h4>
                    <p className="leading-5 mt-1">This gift is connected to your X account.
                    You need to post a tweet to X to receive a gift.</p>
                  </div>
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Button className="mt-7">Post Tweet <img className="inline ml-1" src="/x.svg" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}