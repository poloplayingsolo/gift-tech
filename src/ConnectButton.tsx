import { ConnectButton as ConnectButtonRK } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";

export function ConnectButton() {
  return (
    <ConnectButtonRK.Custom>
      {({
        account,
        chain,
        authenticationStatus,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }: any) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return connected ? (
          <ConnectButtonRK />
        ) : (
          <Button onClick={openConnectModal} variant="outline">Connect Wallet</Button>
        );
      }}
    </ConnectButtonRK.Custom>
  );
}
