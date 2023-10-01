import React from "react";
import { HeaderBar } from "./components/HeaderBar";
import { ImageGallery } from "./components/ImageGallery";

export const App = () => {
  return (
    <React.Fragment>
      <HeaderBar />
      <main className="app__homepage">
        <ImageGallery />
      </main>
    </React.Fragment>
  );
};
