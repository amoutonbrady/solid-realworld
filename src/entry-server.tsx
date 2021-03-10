import fetch from "node-fetch";
import { Router } from "solid-app-router";
import { renderToNodeStream } from "solid-js/web";

import App from "./App";
import { routes } from "./routes";
import ApiProvider from "./store/apiStore";
import StoreProvider from "./store/globalStore";

globalThis.fetch = fetch;

export function render(url: string, ctx: any) {
  return renderToNodeStream(() => (
    <ApiProvider>
      <StoreProvider ctx={ctx}>
        <Router initialURL={url} routes={routes}>
          <App />
        </Router>
      </StoreProvider>
    </ApiProvider>
  ));
}
