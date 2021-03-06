import { useRouter } from 'solid-app-router';
import { lazy } from 'solid-js';
import { useStore } from '../../store';
const Article = lazy(() => import('./Article'));

export default function (props) {
  const [, { loadArticle, loadComments }] = useStore();
  const [router] = useRouter();

  loadArticle(router.params.slug);
  loadComments(router.params.slug);
  return <Article slug={router.params.slug} />;
}
