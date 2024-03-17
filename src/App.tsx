import { Switch, Route } from "wouter";

import { CreateGift } from "./pages/CreateGift";
import { CreateGiftChooseAssetPage } from "./pages/CreateGiftChooseAssetPage";
import { CreateGiftWishesPage } from "./pages/CreateGiftWishesPage";
import { CreateGiftCopyLinkPage } from "./pages/CreateGiftCopyLinkPage";
import { OnlyConnectedGuard } from "./guards/OnlyConnectedGuard";
import { ClaimGiftPage } from "./pages/ClaimGiftPage"

function App() {
  return (
    <div className="p-5">
      <Switch>
        <Route path="/" component={CreateGift} />
        <OnlyConnectedGuard>
          <Route
            path="/create-choose-asset"
            component={CreateGiftChooseAssetPage}
          />
          <Route path="/create-wishes" component={CreateGiftWishesPage} />
          <Route path="/create-copy-link" component={CreateGiftCopyLinkPage} />
        </OnlyConnectedGuard>

        <Route path="/ClaimGiftPage" component={ClaimGiftPage} />

        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export default App;
