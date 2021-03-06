import { useRouter } from 'solid-app-router';
import { createComputed, lazy } from 'solid-js';
import { useStore } from '../../store';
const Profile = lazy(() => import('./Profile'));

export default function (props) {
  const [, { loadProfile, loadArticles }] = useStore();
  const [router] = useRouter();
  const profile = () => (router.params.id as string).slice(1);

  createComputed(() => loadProfile(profile()));

  createComputed(() =>
    router.location.includes('/favorites')
      ? loadArticles({ favoritedBy: profile() })
      : loadArticles({ author: profile() }),
  );

  return <Profile username={profile()} />;
}
