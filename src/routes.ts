import { lazy } from "solid-js";
import { RouteDefinition } from "solid-app-router";
import HomeData from "./pages/Home.data";
import ArticleData from "./pages/Article.data";
import ProfileData from "./pages/Profile.data";
import FeedData from "./pages/Profile/Feed.data";
import HomeFeedData from "./pages/Home/Feed.data";
import EditorData from "./pages/Editor.data";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
    data: HomeData,
    children: [
      {
        path: "/",
        component: lazy(() => import("./pages/Home/Feed")),
        data: HomeFeedData,
      },
      {
        path: "/feed",
        component: lazy(() => import("./pages/Home/Feed")),
        data: HomeFeedData,
      },
    ],
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/Auth")),
  },
  {
    path: "/register",
    component: lazy(() => import("./pages/Auth")),
  },
  {
    path: "/settings",
    component: lazy(() => import("./pages/Settings")),
  },
  {
    path: "/editor/:slug",
    component: lazy(() => import("./pages/Editor")),
    data: EditorData,
  },
  {
    path: "/editor",
    component: lazy(() => import("./pages/Editor")),
    data: EditorData,
  },
  {
    path: "/article/:slug",
    component: lazy(() => import("./pages/Article")),
    data: ArticleData,
  },
  {
    path: "/profile/:username",
    component: lazy(() => import("./pages/Profile")),
    data: ProfileData,
    children: [
      {
        path: "/",
        component: lazy(() => import("./pages/Profile/Feed")),
        data: FeedData,
      },
      {
        path: "/favorites",
        component: lazy(() => import("./pages/Profile/Feed")),
        data: FeedData,
      },
    ],
  },
];
