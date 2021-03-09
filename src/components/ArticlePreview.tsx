import { Link } from "solid-app-router";
import { Component, createState, Show } from "solid-js";

import { useApi } from "../store/apiStore";
import { useStore } from "../store/globalStore";
import { IArticle } from "../types/article.interface";
import { formatDate } from "../utils/formatDate";

const ArticlePreview: Component<{ article: IArticle }> = (props) => {
  const [store] = useStore();

  const api = useApi("article");
  const [article, setArticle] = createState(props.article);

  const updateFavorite = () => {
    // optimistic UI
    setArticle("favorited", (favorited) => !favorited);
    setArticle("favoritesCount", (count) =>
      article.favorited ? count + 1 : count - 1
    );

    const action = article.favorited ? "favorite" : "unfavorite";
    return api[action](article.slug);
  };

  return (
    <div class="article-preview">
      <div class="article-meta">
        <Link href={`/profile/${article.author.username}`}>
          <img src={article.author.image} />
        </Link>

        <div class="info">
          <Link href={`/profile/${article.author.username}`} class="author">
            {article.author.username}
          </Link>

          <span class="date">{formatDate(article.createdAt)}</span>
        </div>
        <Show when={store.isLoggedIn}>
          <button
            onClick={updateFavorite}
            class="btn btn-sm pull-xs-right"
            classList={{
              "btn-outline-primary": !article.favorited,
              "btn-primary": article.favorited,
            }}
          >
            <i class="ion-heart"></i> {article.favoritesCount}
          </button>
        </Show>
      </div>

      <Link href={`/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreview;
