import { DataFn } from "solid-app-router";
import { createResource } from "solid-js";
import { useApi } from "../../store/apiStore";

const HomeFeedData: DataFn = (props) => {
  const api = useApi();
  // We want to do this because we don't want to track location
  const location = props.location;

  const [articles] = createResource(
    () => props.query,
    (query) => {
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
