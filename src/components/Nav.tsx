import { Component, Show } from "solid-js";
import { Link, NavLink, useRouter } from "solid-app-router";

import { useStore } from "../store/globalStore";

const Nav: Component = () => {
  const [store] = useStore();
  const [router] = useRouter();

  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <NavLink class="navbar-brand" href="/">
          conduit
        </NavLink>

        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <NavLink class="nav-link" exact activeClass="active" href="/">
              Home
            </NavLink>
          </li>

          <Show
            when={store.isLoggedIn}
            fallback={
              <>
                <li class="nav-item">
                  <NavLink class="nav-link" activeClass="active" href="/login">
                    Sign in
                  </NavLink>
                </li>

                <li class="nav-item">
                  <NavLink
                    class="nav-link"
                    activeClass="active"
                    href="/register"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            }
          >
            <li class="nav-item">
              <NavLink
                class="nav-link"
                activeClass="active"
                exact
                href="/editor"
              >
                <i class="ion-compose"></i> New Post
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" activeClass="active" href="/settings">
                <i class="ion-gear-a"></i> Settings
              </NavLink>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                classList={{
                  active: router.location.includes(store.user.username),
                }}
                href={`/profile/${store.user.username}`}
              >
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
