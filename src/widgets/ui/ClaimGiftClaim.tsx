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

const formSchema = z.object({
  postURL: z.string().startsWith("https://x.com/"),
});

export function ClaimGiftClaim() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert("test");
  }

  return (
    <div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white sm:rounded-lg">
          <div className="border-b custom-card px-4 py-5 sm:px-6">
            <div className="">
              <h2 className="scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight first:mt-0">
                Congratulations 🎉
              </h2>
              <div className="border-b white-card p-3 mx-auto max-w-56 mt-5 center">
                <img
                  className="inline"
                  src="https://i.seadn.io/gae/GJy0XMbVQe2eISnPxNOJ9K2cyVbGV_GNu2wkgKvumRoZQRqfWKFplamchBxoSgoO_JBLXHp2oHEW5MLtoIOp6r59u15KSGaanj0CBQ?auto=format&dpr=1&w=384"
                />
              </div>
              <h4 className="scroll-m-20 text-xl mt-3 font-semibold tracking-tight">
                You got Bored Ape Yacht Club #9996
              </h4>
              <div className="border-b white-card text-left px-4 mt-5 py-5 sm:px-6">
                Hi, @ReceiverNickname! <br />
                <br />
                I, @SenderNickname gift you this Bored Ape Yacht Club #9996
                wishes
              </div>

              <div className="flex mt-4 space-x-2">
                <Button className="w-full" variant={"outline"}>
                  Check on Opensea
                </Button>
                <Button type="submit" className="w-full">
                  Claim
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
