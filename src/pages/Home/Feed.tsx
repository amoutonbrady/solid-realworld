import { Component, createEffect, For, Show } from "solid-js";
import ArticlePreview from "../../components/ArticlePreview";
import { IArticle } from "../../types/article.interface";

const HomeFeed: Component<{
  articles: { articles: IArticle[]; articlesCount: number };
  articlesCount: (count: number) => void;
}> = (props) => {
  createEffect(() => {
    // We want to emot the number of articles for this feed.
    // This might be better off handled in the .data.ts file and
    // stored in the global store maybe
    if (props.articles && props.articlesCount) {
      props.articlesCount(props.articles.articlesCount);
    }
  });

  return (
    <Show when={props.articles}>
      <For
        each={props.articles.articles}
        fallback={
          <div class="article-preview">No articles are here... yet.</div>
        }
      >
        {(article) => <ArticlePreview article={article} />}
      </For>
    </Show>
  );
};

export default HomeFeed;
