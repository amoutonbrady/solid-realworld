import { Link, Route } from "solid-app-router";
import { Component, For, Show } from "solid-js";
import ArticlePreview from "../components/ArticlePreview";
import { IArticle } from "../types/article.interface";
import { IProfile } from "../types/profile.interface";

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
                <img src={props.profile.image} class="user-img" />
                <h4>{props.profile.username}</h4>
                <p>{props.profile.bio}</p>
                <Show
                  when={props.isCurrentUser}
                  fallback={
                    <button class="btn btn-sm btn-outline-secondary action-btn">
                      <i class="ion-plus-round"></i>
                      &nbsp; Follow {props.profile.username}
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

            <Route />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
