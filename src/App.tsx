import { Route } from "solid-app-router";
import { Component, Suspense } from "solid-js";
import Footer from "./components/Footer";

import Nav from "./components/Nav";

const App: Component = () => {
  return (
    <>
      <Nav />
      <Route />
      <Footer />
    </>
  );
};

export default App;
