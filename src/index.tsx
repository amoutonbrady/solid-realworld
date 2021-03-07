import { Router } from "solid-app-router";
import { render } from "solid-js/web";

import App from "./App";
import { routes } from "./routes";
import ApiProvider from "./store/apiStore";
import StoreProvider from "./store/globalStore";

render(
  () => (
    <ApiProvider>
      <StoreProvider>
        <Router routes={routes}>
          <App />
        </Router>
      </StoreProvider>
    </ApiProvider>
  ),
  document.body
);
