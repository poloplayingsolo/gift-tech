import { useAccount } from "wagmi";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  const account = useAccount();
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="p-5">
      {account.address ?? "No address, connect wallet"}
      <div className="mt-5">
        <ConnectButton />
      </div>
      <div className="mt-5">
        <Button onClick={() => loginWithRedirect()}>Sign in with X</Button>
      </div>
    </div>
  );
}

export default App;
