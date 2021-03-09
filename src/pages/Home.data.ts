import { DataFn } from "solid-app-router";
import { createResource } from "solid-js";

import { useApi } from "../store/apiStore";

const HomeData: DataFn = () => {
  const api = useApi();

  const [tags] = createResource(() => "", api.common.tags);

  return {
    get tags() {
      return tags();
    },
  };
};

export default HomeData;
