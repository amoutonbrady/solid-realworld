import { DataFn } from "solid-app-router";
import { createResource } from "solid-js";

import { useApi } from "../store/apiStore";
import { IArticle } from "../types/article.interface";

const EditorData: DataFn<{ slug: string }> = (props) => {
  const api = useApi();
  const isUpdate = () => !!props.params.slug;

  const [article] = createResource<IArticle | null, string>(
    () => props.params.slug,
    (slug) => (isUpdate() ? api.article.get(slug) : null)
  );

  return {
    get isUpdate() {
      return isUpdate();
    },
    get article() {
      return article();
    },
  };
};

export default EditorData;
