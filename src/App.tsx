import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import CatsView from "@pages/catsView";
// import BreedsView from "@pages/breedsView";
// import FavouritesView from "@pages/favouritesView";
import { CatModal } from "@components/common/CatModal";
import { Navigation } from "@components/common/Navigation";

import { MenuData } from "@base/config/menuData";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        {MenuData?.map(function (menuItem: any) {
          return (
            <Route
              key={menuItem.id}
              path={menuItem.path}
              element={menuItem.page}
            >
              {menuItem.hasModal && (
                <Route
                  path={menuItem.path + "/modal/:id"}
                  element={<CatModal />}
                />
              )}
            </Route>
          );
        })}
        {/* <Route path="/" element={<CatsView />}>
          <Route path="/modal/:id" element={<CatModal />} />
        </Route>
        <Route path="/breeds" element={<BreedsView />}>
          <Route path="/breeds/modal/:id" element={<CatModal />} />
        </Route>
        <Route path="/favourites" element={<FavouritesView />}></Route> */}
      </Routes>
      <Navigation />
      {background && (
        <Routes>
          <Route path="/modal/:id" element={<CatModal />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
