import marked from "marked";
import { Link, useRouter } from "solid-app-router";
import { Component, For, JSX, Show } from "solid-js";

import If from "../components/If";
import { useApi } from "../store/apiStore";
import { useStore } from "../store/globalStore";
import { formatDate } from "../utils/formatDate";
import { prevent } from "../utils/preventDefault";
import { IComment } from "../types/comment.interface";
import { IArticle } from "../types/article.interface";

const Article: Component<{
  article: IArticle;
  comments: IComment[];
  refetchComments: () => void;
}> = (props) => {
  const api = useApi();
  const [store] = useStore();
  const [, { push }] = useRouter();

  const isCurrentUserArticle = () =>
    store.user?.username === props.article?.author.username;

  const deleteArticle = () =>
    api.article.delete(props.article.slug).then(() => push("/"));

  const addComment: JSX.EventHandlerUnion<HTMLFormElement, Event> = (event) => {
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data) as any;

    api.comments.add(props.article.slug, body).then(props.refetchComments);
  };

  const removeComment = (id: string) => {
    api.comments.delete(props.article.slug, id).then(props.refetchComments);
  };

  return (
    <div class="article-page">
      <Show when={props.article} fallback={<p>Loading article...</p>}>
        <div class="banner">
          <div class="container">
            <h1>{props.article.title}</h1>

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

                <span class="date">{formatDate(props.article.createdAt)}</span>
              </div>

              <If condition={store.isLoggedIn}>
                <Show
                  when={isCurrentUserArticle()}
                  fallback={
                    <>
                      <button class="btn btn-sm btn-outline-secondary">
                        <i class="ion-plus-round"></i> Follow{" "}
                        {props.article.author.username}{" "}
                        <span
                          class="counter"
                          style={{
                            display: props.article.author.following
                              ? "inline-block"
                              : "none",
                          }}
                        >
                          ({props.article.author.following})
                        </span>
                      </button>

                      <button class="btn btn-sm btn-outline-primary m-l-1">
                        <i class="ion-heart"></i> Favorite Post{" "}
                        <span class="counter">
                          ({props.article.favoritesCount})
                        </span>
                      </button>
                    </>
                  }
                >
                  <Link
                    href={`/editor/${props.article.slug}`}
                    class="btn btn-sm btn-outline-secondary"
                  >
                    <i class="ion-edit"></i> Edit article
                  </Link>

                  <button
                    onClick={deleteArticle}
                    class="btn btn-outline-danger btn-sm m-l-1"
                  >
                    <i class="ion-trash-a"></i> Delete article
                  </button>
                </Show>
              </If>
            </div>
          </div>
        </div>
      </Show>

      <div class="container page">
        <Show when={props.article}>
          <div class="row article-content">
            <div
              class="col-md-12"
              innerHTML={marked(props.article.body, { sanitize: true })}
            />
          </div>

          <ul
            class="tag-list"
            classList={{ hidden: !props.article.tagList.length }}
          >
            <For each={props.article.tagList}>
              {(tag) => <li class="tag-default tag-pill tag-outline">{tag}</li>}
            </For>
          </ul>

          <hr />
        </Show>

        {/* Comments section */}
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <Show
              when={store.isLoggedIn}
              fallback={
                <p>
                  <Link href="/login">Sign in</Link>
                  &nbsp;or&nbsp;
                  <Link href="/register">sign up</Link>
                  &nbsp;to add comments on this article.
                </p>
              }
            >
              <form onSubmit={prevent(addComment)} class="card comment-form">
                <div class="card-block">
                  <textarea
                    class="form-control"
                    placeholder="Write a comment..."
                    name="body"
                    rows="3"
                  ></textarea>
                </div>

                <div class="card-footer">
                  <img src={store.user.image} class="comment-author-img" />

                  <button type="submit" class="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>
            </Show>

            <Show when={props.comments} fallback={<p>Loading comments...</p>}>
              <For each={props.comments}>
                {(comment) => (
                  <div class="card">
                    <div class="card-block">
                      <p class="card-text">{comment.body}</p>
                    </div>
                    <div class="card-footer">
                      <Link
                        href={`/profile/${comment.author.username}`}
                        class="comment-author"
                      >
                        <img
                          src={comment.author.image}
                          class="comment-author-img"
                        />
                      </Link>

                      <Link
                        href={`/profile/${comment.author.username}`}
                        class="comment-author m-l-1"
                      >
                        {comment.author.username}
                      </Link>

                      <span class="date-posted">
                        {formatDate(comment.createdAt)}
                      </span>

                      <Show when={store.isLoggedIn}>
                        <span class="mod-options">
                          <button
                            class="p-0"
                            style="border: 0; background: transparent"
                            onClick={[removeComment, comment.id]}
                          >
                            <i class="m-l-0 ion-trash-a"></i>
                          </button>
                        </span>
                      </Show>
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
