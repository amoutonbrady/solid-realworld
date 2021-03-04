import { Route } from 'solid-app-router';
import { createSignal, createComputed, Show, Suspense } from 'solid-js';

import { useStore } from './store';
import NavBar from './components/NavBar';

export default () => {
  const [store, { pullUser }] = useStore();
  const [appLoaded, setAppLoaded] = createSignal(false);

  if (!store.token) setAppLoaded(true);
  else {
    pullUser();
    createComputed(() => store.currentUser && setAppLoaded(true));
  }

  return (
    <>
      <NavBar />

      <Show when={appLoaded()}>
        <Suspense fallback={<div class="container">Loading...</div>}>
          <Route />
        </Suspense>
      </Show>
    </>
  );
};
