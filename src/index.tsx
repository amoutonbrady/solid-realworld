import { Router } from "solid-app-router";
import { hydrate, render } from "solid-js/web";

import App from "./App";
import { routes } from "./routes";
import ApiProvider from "./store/apiStore";
import StoreProvider from "./store/globalStore";

hydrate(
  () => (
    <ApiProvider>
      <StoreProvider>
        <Router routes={routes}>
          <App />
        </Router>
      </StoreProvider>
    </ApiProvider>
  ),
  document.getElementById("app")
);
