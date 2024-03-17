import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

interface NFT {
  imageUrl?: string;
  id: string;
  contractAddress: string;
}

export function CreateGiftChooseAsset() {
  const [nfts, setNfts] = useState<NFT[]>([{imageUrl: "https://i.seadn.io/gae/GJy0XMbVQe2eISnPxNOJ9K2cyVbGV_GNu2wkgKvumRoZQRqfWKFplamchBxoSgoO_JBLXHp2oHEW5MLtoIOp6r59u15KSGaanj0CBQ?auto=format&dpr=1&w=384", id: "1", contractAddress: "0x00000000000000000000000000000000000"}]);
  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              You can use ERC721 token on Polygon blockchain from your balance to wrap a claimable gift and send to your friend’s email or X. 
            </p>
            <div className="mt-5">
              <div className="grid w-full items-center gap-1.5">
                {/*<Label htmlFor="amount" className="text-left text-lg font-medium">Specify amount</Label>
                <Input placeholder="Example: 0.00000001"/>*/}
                <Label htmlFor="destination" className="text-left text-lg font-medium">Select NFT from your balance</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {nfts.map((nft) => (
                      <SelectItem key={nft.id} value="light">
                        <img width={50} height={50} alt={nft.id} src={nft.imageUrl} />
                        <div> Address: {nft.address}</div>
                        <div> ID: {nft.id}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label htmlFor="destination" className="text-left text-lg font-medium">Specify destination</Label>
                <Input placeholder="Example: @GiftTwitter"/>
                <Button className="mt-3">Continue</Button>
              </div>
              <p className="text-sm font-light text-muted-foreground mt-5">
                Made on Internet Computer Chain Key, thus asset will be stored on Polygon smart contract, controlled by ICP blockchain and can be claimed only by user, you specify.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}