import { useRouter } from 'solid-app-router';
import { createComputed, lazy } from 'solid-js';
import { useStore } from '../../store';
const Profile = lazy(() => import('./Profile'));

export default function (props) {
  const [, { loadProfile, loadArticles }] = useStore();
  const [router] = useRouter();

  createComputed(
    () => props.routeName === 'profile' && loadProfile(props.params[0]),
  );

  createComputed(
    () =>
      props.routeName === 'profile' &&
      (router.location.includes('/favorites')
        ? loadArticles({ favoritedBy: props.params[0] })
        : loadArticles({ author: props.params[0] })),
  );

  return <Profile username={props.params[0]} />;
}
