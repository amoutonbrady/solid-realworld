import { createContext, useContext, createState } from "solid-js";
import createAgent from "./createAgent";
import createArticles from "./createArticles";
import createAuth from "./createAuth";
import createCommon from "./createCommon";
import createComments from "./createComments";
import createProfile from "./createProfile";
import createRouteHandler from "./createRouteHandler";

const StoreContext = createContext();
const RouterContext = createContext();

export function Provider(props) {
  let articles, comments, tags, profile, currentUser;

  const router = createRouteHandler("");

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
    token: localStorage.getItem("jwt"),
    appName: "conduit"
  });
  const actions = {};
  const store = [state, actions];
  const agent = createAgent(store);

  articles = createArticles(agent, actions, state, setState);
  comments = createComments(agent, actions, state, setState);
  tags = createCommon(agent, actions, state, setState);
  profile = createProfile(agent, actions, state, setState);
  currentUser = createAuth(agent, actions, setState);

  return (
    <RouterContext.Provider value={router}>
      <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
    </RouterContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

export function useRouter() {
  return useContext(RouterContext);
}
