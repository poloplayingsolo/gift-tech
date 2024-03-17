import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

export function CreateGiftCopyLink() {
  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
            <div className="">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="destination" className="text-lg font-medium">Change to NFT select here</Label>
                <p className="leading-7">Copy link below and share with your friend</p>
                <Button className="mt-3">Copy Link</Button>
              </div>
              <p className="text-sm font-light text-muted-foreground mt-5">
                Or copy link: <br />
                <span className="underline">https://gift.tech/gift/34FGRuhebt48rtgsgoig-gwrouhgd</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}