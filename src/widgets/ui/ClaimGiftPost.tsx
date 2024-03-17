import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation, useSearch } from "wouter";

const formSchema = z.object({
  postURL: z
    .string()
    .startsWith("https://x.com/")
    .or(z.string().startsWith("https://twitter.com")),
});

export function ClaimGiftPost() {
  const search = useSearch();
  const [_, setLocation] = useLocation();

  const params = new URLSearchParams(search);
  const xHandle = params.get("xHandle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLocation("/claim", {
      state: {
        postURL: values.postURL,
        xHandle,
        contractAddress: params.get("contractAddress"),
        tokenId: params.get("tokenId"),
      },
    });
  }

  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white sm:rounded-lg">
          <div className="border-b custom-card px-4 py-5 sm:px-6">
            <div className="">
              <div className="border-b white-card text-left px-4 py-5 sm:px-6">
                <div className="flex flex-row">
                  <img
                    className="inline mr-3  mt-1 self-start"
                    src="/x-black-bg.svg"
                  />
                  <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Hi, {xHandle} !
                    </h4>
                    <p className="leading-5 mt-1">
                      This gift is connected to your X account. You need to post
                      a tweet to X to receive a gift.
                    </p>
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Button
                    className="mt-7 shadow-none"
                    variant={"outline"}
                    onClick={() => {
                      window.open("https://twitter.com/home", "_blank");
                    }}
                  >
                    Post Tweet <img className="inline ml-1" src="/x.svg" />
                  </Button>
                </div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
                  <FormField
                    control={form.control}
                    name="postURL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight text-left w-full">
                          Link to post
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://x.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-3">
                    Verify
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
