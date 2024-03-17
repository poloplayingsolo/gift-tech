import { Switch, Route } from "wouter";

import { CreateGift } from "./pages/CreateGift";
import { OtherPage } from "./pages/OtherPage";
import { CreateGiftPage } from "./prototype/CreateGiftPage";
import { CreateGiftChooseAssetPage } from "./pages/CreateGiftChooseAssetPage"
import { CreateGiftWishesPage } from "./pages/CreateGiftWishesPage"
import { CreateGiftCopyLinkPage } from "./pages/CreateGiftCopyLinkPage"

function App() {
  return (
    <div className="p-5">
      <Switch>
        <Route path="/" component={CreateGift} />
        <Route path="/create-choose-asset" component={CreateGiftChooseAssetPage} />
        <Route path="/CreateGiftWishesPage" component={CreateGiftWishesPage} />
        <Route path="/CreateGiftCopyLinkPage" component={CreateGiftCopyLinkPage} />

        <Route path="/other" component={OtherPage} />

        {/** PROTOTYPE PART */}
        <Route path="/create" component={CreateGiftPage} />

        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export default App;
