import { useRouter } from 'solid-app-router';
import { createComputed, createMemo, useTransition, lazy } from 'solid-js';
import { useStore } from '../../store';
const Home = lazy(() => import('./Home'));

export default function HomePage() {
  const [store, { loadArticles, setPage }] = useStore();
  const { token, appName } = store;
  const [router] = useRouter();

  const tab = createMemo(() => {
    const tab = router.query.tab;
    if (!tab) return token ? 'feed' : 'all';
    return tab;
  });

  const [, start] = useTransition();

  const getPredicate = () => {
    switch (tab()) {
      case 'feed':
        return { myFeed: true };
      case 'all':
        return {};
      case undefined:
        return undefined;
      default:
        return { tag: tab() };
    }
  };

  const handleSetPage = (page) => {
    start(() => {
      setPage(page);
      loadArticles(getPredicate());
    });
  };

  createComputed(() => loadArticles(getPredicate()));

  return (
    <Home
      handleSetPage={handleSetPage}
      appName={appName}
      token={token}
      tab={tab}
      store={store}
    />
  );
}
