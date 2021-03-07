import { createResource } from "solid-js";
import { DataFn } from "solid-app-router";
import { useApi } from "../../store/apiStore";

const FeedData: DataFn<{ username: string }> = (props) => {
  const api = useApi();
  const isFavorites = props.location.includes("favorite");

  const [articles] = createResource(() => {
    return { [isFavorites ? "favorited" : "author"]: props.params.username };
  }, api.article.list);

  return {
    get articles() {
      return articles();
    },
  };
};

export default FeedData;
