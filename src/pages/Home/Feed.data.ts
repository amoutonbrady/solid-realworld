import { DataFn } from "solid-app-router";
import { createResource } from "solid-js";
import { useApi } from "../../store/apiStore";

const HomeFeedData: DataFn = (props) => {
  const api = useApi();

  const [articles] = createResource(
    () => props,
    ({ location, query }) => {
      if (!["/", "/feed"].includes(location)) return;

      return location.includes("feed")
        ? api.article.feed(query as any)
        : api.article.list(query);
    }
  );

  return {
    get articles() {
      return articles();
    },
  };
};

export default HomeFeedData;
