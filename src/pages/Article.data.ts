import { DataFn } from "solid-app-router";
import { createResource } from "solid-js";

import { useApi } from "../store/apiStore";

const ArticleData: DataFn<{ slug: string }> = (props) => {
  const api = useApi();

  const [article] = createResource(() => props.params.slug, api.article.get);
  const [comments, { refetch }] = createResource(
    () => props.params.slug,
    api.comments.get
  );

  return {
    get comments() {
      return comments();
    },

    get article() {
      return article();
    },
    refetchComments: refetch,
  };
};

export default ArticleData;
