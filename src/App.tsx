import { Switch, Route } from "wouter";

import { CreateGift } from "./pages/CreateGift";
import { CreateGiftChooseAssetPage } from "./pages/CreateGiftChooseAssetPage";
import { CreateGiftWishesPage } from "./pages/CreateGiftWishesPage";
import { CreateGiftCopyLinkPage } from "./pages/CreateGiftCopyLinkPage";
import { ClaimGiftPostPage } from "./pages/ClaimGiftPostPage";
import { ClaimGiftClaimPage } from "./pages/ClaimGiftClaimPage";

function App() {
  return (
    <div className="p-5">
      <Switch>
        <Route path="/" component={CreateGift} />

        <Route
          path="/create-choose-asset"
          component={CreateGiftChooseAssetPage}
        />
        <Route path="/create-wishes" component={CreateGiftWishesPage} />
        <Route path="/create-copy-link" component={CreateGiftCopyLinkPage} />

        <Route path="/claim-post" component={ClaimGiftPostPage} />
        <Route path="/claim" component={ClaimGiftClaimPage} />

        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export default App;
