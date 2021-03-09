import { Link, Route } from "solid-app-router";
import { Component, createState, Show, Suspense } from "solid-js";
import If from "../components/If";
import { useApi } from "../store/apiStore";
import { useStore } from "../store/globalStore";
import { IArticle } from "../types/article.interface";
import { IProfile } from "../types/profile.interface";

const UserMeta: Component<{ profile: IProfile; isCurrentUser: boolean }> = (
  props
) => {
  const api = useApi("profile");
  const [store] = useStore();
  const [profile, setProfile] = createState(props.profile);

  const updateFollowing = () => {
    // optimistic UI
    setProfile("following", (following) => !following);

    const action = profile.following ? "follow" : "unfollow";
    return api[action](profile.username);
  };

  return (
    <>
      <img src={props.profile.image} class="user-img" />
      <h4>{props.profile.username}</h4>
      <p>{props.profile.bio}</p>

      <If condition={store.isLoggedIn}>
        <Show
          when={props.isCurrentUser}
          fallback={
            <button
              onClick={updateFollowing}
              class="btn btn-sm action-btn"
              classList={{
                "btn-secondary": props.profile.following,
                "btn-outline-secondary": !props.profile.following,
              }}
            >
              <i class="ion-plus-round"></i>{" "}
              {props.profile.following ? "Following" : "Follow"}{" "}
              {props.profile.username}
            </button>
          }
        >
          <Link
            href="/settings"
            class="btn btn-sm btn-outline-secondary action-btn"
          >
            <i class="ion-gear-a"></i> Edit Profile Settings
          </Link>
        </Show>
      </If>
    </>
  );
};

const Profile: Component<{
  isCurrentUser: boolean;
  isFavorites: boolean;
  articles: IArticle[];
  profile: IProfile;
}> = (props) => {
  return (
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <Show when={props.profile}>
                <UserMeta {...props} />
              </Show>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <Show when={props.profile}>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      classList={{ active: !props.isFavorites }}
                      href={`/profile/${props.profile.username}`}
                    >
                      My Article
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      classList={{ active: props.isFavorites }}
                      href={`/profile/${props.profile.username}/favorites`}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </Show>
              </ul>
            </div>

            <Suspense fallback={<p>Loading feed...</p>}>
              <Route />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
