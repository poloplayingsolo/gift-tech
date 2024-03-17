import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountNFTs } from "@/hooks/useAccountNFTs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  xHandle: z.string(),
  nftID: z.string(),
});

export function CreateGiftChooseAsset() {
  const nfts = useAccountNFTs();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("HERE");
    console.log(values);
  }

  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 custom-card px-4 py-5 sm:px-6">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              You can use ERC721 token on Polygon blockchain from your balance
              to wrap a claimable gift and send to your friend’s email or X.
            </p>
            <div className="mt-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid w-full items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="nftID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select NFT from your balance</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} {...field}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent>
                                {nfts.map((nft) => (
                                  <SelectItem key={nft.id} value={nft.id}>
                                    <img
                                      width={50}
                                      height={50}
                                      alt={nft.id.toString()}
                                      src={nft.imageUrl}
                                    />
                                    <div> Address: {nft.contractAddress}</div>
                                    <div> ID: {nft.id.toString()}</div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="xHandle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify destination</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Example: @GiftTwitter"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="mt-3">
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
              <p className="text-sm font-light text-muted-foreground mt-5">
                Made on Internet Computer Chain Key, thus asset will be stored
                on Polygon smart contract, controlled by ICP blockchain and can
                be claimed only by user, you specify.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}