import { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';

const Article = lazy(() => import('./pages/Article/Article'));
const Auth = lazy(() => import('./pages/Auth'));
const Editor = lazy(() => import('./pages/Editor'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/profile',
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
    path: '/article/:id',
    component: Article,
  },
  {
    path: '/editor/:id',
    component: Editor,
  },
];
