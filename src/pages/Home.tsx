import { Link, Route, useRouter } from "solid-app-router";
import { Component, For, Show, Suspense } from "solid-js";
import { useStore } from "../store/globalStore";
import { IArticle } from "../types/article.interface";

const Home: Component<{
  articles: IArticle[];
  tags: string[];
}> = (props) => {
  const [store] = useStore();
  const [router] = useRouter();

  return (
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <Show when={store.isLoggedIn}>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      classList={{ active: router.location === "/feed" }}
                      href="/feed"
                    >
                      Your Feed
                    </Link>
                  </li>
                </Show>
                <li class="nav-item">
                  <Link
                    class="nav-link"
                    classList={{ active: router.location === "/" }}
                    href="/"
                  >
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            <Suspense fallback={<p>Loading feed...</p>}>
              <Route />
            </Suspense>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <Show when={props.tags} fallback={<p>Loading tags...</p>}>
                  <For each={props.tags}>
                    {(tag) => (
                      <Link href={`/?tag=${tag}`} class="tag-pill tag-default">
                        {tag}
                      </Link>
                    )}
                  </For>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
