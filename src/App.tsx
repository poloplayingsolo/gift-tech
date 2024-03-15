import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <Button type="button" onClick={() => disconnect()}>
            Disconnect
          </Button>
        )}
      </div>

      <div>
        <button onClick={() => loginWithRedirect()}>Log In</button>;
      </div>
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </Button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
