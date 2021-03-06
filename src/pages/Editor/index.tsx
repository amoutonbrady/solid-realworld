import { useRouter } from 'solid-app-router';
import { createEffect, lazy } from 'solid-js';
import { useStore } from '../../store';

const Editor = lazy(() => import('./Editor'));

export default function (props) {
  const [, { loadArticle }] = useStore();
  const [router] = useRouter();

  createEffect(() => {
    if (router.params.slug) loadArticle(router.params.slug);
  });

  return <Editor slug={router.params.slug} />;
}
