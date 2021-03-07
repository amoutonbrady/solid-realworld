import { Link } from "solid-app-router";
import { Component } from "solid-js";
import { IArticle } from "../types/article.interface";

const ArticlePreview: Component<{ article: IArticle }> = (props) => {
  return (
    <div class="article-preview">
      <div class="article-meta">
        <Link href={`/profile/${props.article.author.username}`}>
          <img src={props.article.author.image} />
        </Link>

        <div class="info">
          <Link
            href={`/profile/${props.article.author.username}`}
            class="author"
          >
            {props.article.author.username}
          </Link>

          <span class="date">
            {new Date(props.article.createdAt).toLocaleDateString()}
          </span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i class="ion-heart"></i> {props.article.favoritesCount}
        </button>
      </div>

      <Link href={`/article/${props.article.slug}`} class="preview-link">
        <h1>{props.article.title}</h1>
        <p>{props.article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreview;
