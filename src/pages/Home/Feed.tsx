import { Component, For, Show } from "solid-js";
import ArticlePreview from "../../components/ArticlePreview";
import { IArticle } from "../../types/article.interface";

const HomeFeed: Component<{
  articles: { articles: IArticle[]; articlesCount: number };
}> = (props) => {
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
