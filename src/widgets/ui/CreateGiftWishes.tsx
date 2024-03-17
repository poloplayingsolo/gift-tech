import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const formSchema = z.object({
  wishes: z.string(),
});

export function CreateGiftWishes() {
  const _nfts = useAccountNFTs();
  const history = useHistoryState<{ xHandle: string; nftID: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { ...history, ...values };
    alert(JSON.stringify(data));
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

                    <Button type="submit" className="mt-3">
                      Sign
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
