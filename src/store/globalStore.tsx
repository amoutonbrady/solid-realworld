import {
  Component,
  createContext,
  createResource,
  createSignal,
  Suspense,
  useContext,
} from "solid-js";

import { useApi } from "./apiStore";
import { isServer } from "solid-js/web";
import { IUser } from "../types/user.interface";

/**
 * We use cookie to store the token in order to have
 * access on both the client and the server
 */
const cookie = {
  get(cookie?: string) {
    const cookies = document.cookie.split("; ").reduce((cookies, cookie) => {
      const [key, ...value] = cookie.split("=");
      cookies[key] = decodeURIComponent(value.join());
      return cookies;
    }, {});

    return cookie ? cookies[cookie] : cookies;
  },

  set(cookie: string, value: string) {
    document.cookie = `${cookie}=${value}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
  },

  delete(cookie: string) {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};

function createStore(ctx: any) {
  const authApi = useApi("auth");
  const token = isServer ? ctx.token : cookie.get("token");

  if (token) {
    authApi.setToken(token);
  }

  /**
   * This is our current user
   */
  const [user, setUser] = createSignal<Partial<IUser>>({});

  /**
   * If we have a token at the initialization of the app
   * we want to fetch the current user and fill in the store.
   */
  const [user$] = createResource(user, async (user) => {
    if (user.token) return user;
    return token ? authApi.me() : undefined;
  });

  return [
    {
      get user() {
        return user$();
      },
      get isLoggedIn() {
        return !!user$();
      },
    },
    {
      setUser(currentUser?: IUser) {
        /**
         * This could probably be cleaner.
         * There are two times this function will be called:
         *
         * 1. When the user login, we want to fill in the current user and register
         * the token in the cookie to maintain the session
         *
         * 2. When the user logout. We want to clear everything.
         */
        if (!currentUser) {
          cookie.delete("token");
          authApi.setToken("");
        } else {
          cookie.set("token", currentUser.token);
          authApi.setToken(currentUser.token);
        }

        setUser(currentUser);
      },
    },
  ] as const;
}

// Unwrap a Promise type `Promise<T>` will become `T`
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
// Our store typing this is helpful for the `useStore` hook to be properly typed
type Store = ThenArg<ReturnType<typeof createStore>>;

const StoreContext = createContext<Store>();

const StoreProvider: Component<{ ctx?: any }> = (props) => {
  /**
   * This is a hacky way of having an async store init.
   * This allow us to wait for the store to be created before
   * rendering the application.
   */
  const store = createStore(props.ctx);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  return useContext(StoreContext);
}

export default StoreProvider;
