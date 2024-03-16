import { Switch, Route } from "wouter";

import { HomePage } from "./pages/HomePage";
import { OtherPage } from "./pages/OtherPage";
import { CreateGiftPage } from "./prototype/CreateGiftPage";

function App() {
  return (
    <div className="p-5">
      <Switch>
        <Route path="/" component={HomePage} />

        <Route path="/other" component={OtherPage} />

        {/** PROTOTYPE PART */}
        <Route path="/create" component={CreateGiftPage} />

        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export default App;
