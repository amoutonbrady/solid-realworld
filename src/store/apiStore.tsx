import { Component, createContext, useContext } from "solid-js";
import { conduitClient } from "./api";

type IContext = ReturnType<typeof conduitClient>;
const ApiContext = createContext<IContext>();

const ApiProvider: Component = (props) => {
  /**
   * TODO: Add the API endpoint as a props
   * TODO: Perhaps pass down a fetch instance to the API for isomorphic use
   */
  const client = conduitClient("https://conduit.productionready.io/api");
  return (
    <ApiContext.Provider value={client}>{props.children}</ApiContext.Provider>
  );
};

/**
 * This typing, although a bit verbose, essentially allow us
 * to request a specific namespace of the API.
 *
 * For example: const authApi = useApi('auth')
 */
export function useApi(): IContext;
export function useApi<Key extends keyof IContext>(key: Key): IContext[Key];
export function useApi(key?: string) {
  const ctx = useContext(ApiContext);
  return key ? ctx[key] : ctx;
}

export default ApiProvider;
