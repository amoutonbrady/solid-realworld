import { Component, createEffect, Show } from "solid-js";
import { Link } from "solid-app-router";
import { useStore } from "../store/globalStore";

const Nav: Component = () => {
  const [store] = useStore();

  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <Link class="navbar-brand" href="/">
          conduit
        </Link>

        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <Link class="nav-link active" href="/">
              Home
            </Link>
          </li>

          <Show
            when={store.isLoggedIn}
            fallback={
              <>
                <li class="nav-item">
                  <Link class="nav-link" href="/login">
                    Sign in
                  </Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link" href="/register">
                    Sign up
                  </Link>
                </li>
              </>
            }
          >
            <li class="nav-item">
              <Link class="nav-link" href="/editor">
                <i class="ion-compose"></i> New Post
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/settings">
                <i class="ion-gear-a"></i> Settings
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href={`/profile/${store.user.username}`}>
                {store.user.username}
              </Link>
            </li>
          </Show>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
