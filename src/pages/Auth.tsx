import { Link, useRouter } from "solid-app-router";
import { Component, createSignal, JSX, Show } from "solid-js";

import Errors from "../components/Errors";
import { useApi } from "../store/apiStore";
import { useStore } from "../store/globalStore";
import { prevent } from "../utils/preventDefault";

const Auth: Component = () => {
  const authApi = useApi("auth");
  const [, { setUser }] = useStore();
  const [router, { push }] = useRouter();

  const [errors, setErrors] = createSignal<Error | Record<string, string[]>>();

  const isLogin = () => router.location.includes("login");
  const page = () => (isLogin() ? "Sign in" : "Sign up");

  const submit: JSX.EventHandlerUnion<HTMLFormElement, Event> = async (
    event
  ) => {
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data) as any;

    const res = isLogin() ? authApi.login(body) : authApi.register(body);

    return res
      .then(setUser)
      .then(() => push("/"))
      .catch(setErrors);
  };

  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{page()}</h1>

            <Show
              when={!isLogin()}
              fallback={
                <p class="text-xs-center">
                  <Link href="/register">Need an account?</Link>
                </p>
              }
            >
              <p class="text-xs-center">
                <Link href="/login">Have an account?</Link>
              </p>
            </Show>

            <Show when={errors()}>
              <Errors errors={errors()} />
            </Show>

            <form onSubmit={prevent(submit)}>
              <Show when={!isLogin()}>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    name="username"
                    placeholder="Your Name"
                  />
                </fieldset>
              </Show>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>

              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                {page()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
