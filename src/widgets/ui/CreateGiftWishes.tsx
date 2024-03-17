import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useHistoryState } from "wouter/use-browser-location";
import { useAccountNFTs } from "@/hooks/useAccountNFTs";
import { useSendNFTToCanister } from "@/hooks/useSendNFTToCanister";
import { canister } from "@/canister";

const formSchema = z.object({
  wishes: z.string(),
});

export function CreateGiftWishes() {
  const [sendNFTToCanister, sendNFTToCanisterLoading] = useSendNFTToCanister();
  const nfts = useAccountNFTs();
  const history = useHistoryState<{ xHandle: string; nftID: string }>();
  const [_location, setLocation] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const nft = nfts.find((nft) => nft.id === history.nftID);
    if (!nft)
      throw new Error("No NFT in history list, steps are broken probably");

    try {
      await sendNFTToCanister(nft.contractAddress, nft.tokenId);
      await canister.pushGift(
        nft.contractAddress,
        nft.tokenId,
        history.xHandle,
        values.wishes
      );
      setLocation("/create-copy-link", { state: {
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
        xHandle: history.xHandle,
      }});
    } catch (e: unknown) {
      if (e instanceof Error) {
        swal("Oops", e.message, "error");
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
                <div className="">
                  <div className="grid w-full items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="wishes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Put your best wishes</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Hi, @ReceiverNickname! I, @SenderNickname gift you this Bored Ape Yacht Club #9996!"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={sendNFTToCanisterLoading}
                      type="submit"
                      className="mt-3"
                    >
                      {sendNFTToCanisterLoading ? "Loading..." : "Transfer"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
