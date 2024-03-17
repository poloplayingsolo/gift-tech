import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function CreateGiftWishes() {
  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
            <div className="">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="destination" className="text-left text-lg font-medium">Put your best wishes</Label>
                <Textarea placeholder="Hi, @ReceiverNickname! I, @SenderNickname gift you this Bored Ape Yacht Club #9996!"/>
                <Button className="mt-3">Sign</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}