import { Link, NavLink, Route, useRouter } from "solid-app-router";
import {
  Component,
  createMemo,
  createState,
  For,
  Show,
  Suspense,
} from "solid-js";

import If from "../components/If";
import { useStore } from "../store/globalStore";

const Home: Component<{ tags: string[] }> = (props) => {
  const [store] = useStore();
  const [router] = useRouter();

  const [state, setState] = createState({ count: 0, limit: 10 });

  const pagination = createMemo(() =>
    new Array(Math.round(state.count / state.limit))
      .fill(0)
      .map((_, i) => i + 1)
  );

  const getPage = (page: number) => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const offset = (page - 1) * state.limit;
    const query = new URLSearchParams(router.query as any);
    query.set("limit", state.limit.toString());
    query.set("offset", offset.toString());
    query.set("page", page.toString());

    return router.location.replace(/\?.+/g, "") + "?" + query.toString();
  };

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
                <If condition={store.isLoggedIn}>
                  <li class="nav-item">
                    <NavLink class="nav-link" activeClass="active" href="/feed">
                      Your Feed
                    </NavLink>
                  </li>
                </If>

                <li class="nav-item">
                  <NavLink class="nav-link" activeClass="active" href="/" exact>
                    Global Feed
                  </NavLink>
                </li>
              </ul>
            </div>

            <Suspense
              fallback={<div class="article-preview">Loading feed...</div>}
            >
              <Route
                // @ts-ignore
                articlesCount={(count: number) => setState({ count })}
              />
            </Suspense>

            <Show when={state.count}>
              <nav>
                <ul class="pagination">
                  <For each={pagination()}>
                    {(page) => (
                      <li
                        class="page-item"
                        classList={{
                          active: page === (+router.query.page || 1),
                        }}
                      >
                        <Link href={getPage(page)} class="page-link">
                          {page}
                        </Link>
                      </li>
                    )}
                  </For>
                </ul>
              </nav>
            </Show>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <Suspense fallback={<p>Loading tags...</p>}>
                  <For each={props.tags}>
                    {(tag) => (
                      <Link href={`/?tag=${tag}`} class="tag-pill tag-default">
                        {tag}
                      </Link>
                    )}
                  </For>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
