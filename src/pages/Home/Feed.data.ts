import { DataFn } from "solid-app-router";
import { createResource, mergeProps } from "solid-js";

import { useApi } from "../../store/apiStore";

const HomeFeedData: DataFn = (props) => {
  const api = useApi();
  // We don't want to track location
  const location = props.location;

  const [articles] = createResource(
    () => mergeProps({ limit: "10", offset: "0" }, props.query),
    (query) => {
      return location.includes("feed")
        ? api.article.feed(query as any)
        : api.article.list(query as any);
    }
  );

  return {
    get articles() {
      return articles();
    },
  };
};

export default HomeFeedData;
