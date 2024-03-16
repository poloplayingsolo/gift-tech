import { Switch, Route } from "wouter";

import { HomePage } from "./pages/HomePage";
import { OtherPage } from "./pages/OtherPage";

function App() {
  return (
    <div className="p-5">
      <Switch>
        <Route path="/" component={HomePage} />

        <Route path="/other" component={OtherPage} />

        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export default App;
