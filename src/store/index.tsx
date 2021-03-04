import { createContext, useContext, createState } from 'solid-js';

import createAgent from './createAgent';
import createArticles from './createArticles';
import createAuth from './createAuth';
import createCommon from './createCommon';
import createComments from './createComments';
import createProfile from './createProfile';

const StoreContext = createContext();

export function Provider(props) {
  let articles;
  let comments;
  let tags;
  let profile;
  let currentUser;

  const [state, setState] = createState({
    get articles() {
      return articles && articles();
    },
    get comments() {
      return comments && comments();
    },
    get tags() {
      return tags && tags();
    },
    get profile() {
      return profile && profile();
    },
    get currentUser() {
      return currentUser && currentUser();
    },
    page: 0,
    totalPagesCount: 0,
    token: localStorage.getItem('jwt'),
    appName: 'conduit',
  });

  const actions = {};
  const store: [any, any] = [state, actions];
  const agent = createAgent(store);

  articles = createArticles(agent, actions, state, setState);
  comments = createComments(agent, actions, state, setState);
  tags = createCommon(agent, actions, state, setState);
  profile = createProfile(agent, actions, state, setState);
  currentUser = createAuth(agent, actions, setState);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore(): any {
  return useContext(StoreContext);
}
