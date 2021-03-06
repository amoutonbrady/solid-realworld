import { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';

const Article = lazy(() => import('./pages/Article'));
const Auth = lazy(() => import('./pages/Auth'));
const Editor = lazy(() => import('./pages/Editor'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/profile/:id',
    component: Profile,
  },
  {
    path: '/profile/:id/favorites',
    component: Profile,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/login',
    component: Auth,
  },
  {
    path: '/register',
    component: Auth,
  },
  {
    path: '/article/:slug',
    component: Article,
  },
  {
    path: '/editor',
    component: Editor,
  },
  {
    path: '/editor/:slug',
    component: Editor,
  },
];
