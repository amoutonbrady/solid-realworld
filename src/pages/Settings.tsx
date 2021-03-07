import { useRouter } from "solid-app-router";
import { Component, createComputed, createSignal, JSX, Show } from "solid-js";
import Errors from "../components/Errors";
import { useApi } from "../store/apiStore";
import { useStore } from "../store/globalStore";
import { prevent } from "../utils/preventDefault";

const Settings: Component = () => {
  const api = useApi();
  const [, { push }] = useRouter();
  const [store, { setUser }] = useStore();

  createComputed(() => {
    if (!store.isLoggedIn) push("/");
  });

  const [errors, setErrors] = createSignal<Error | Record<string, string[]>>();

  const submit: JSX.EventHandlerUnion<HTMLFormElement, Event> = async (
    event
  ) => {
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data) as any;

    if (!body.password) delete body.password;
    if (!body.image) delete body.image;

    return api.auth.update(body).then(setUser).catch(setErrors);
  };

  const logout = () => {
    setUser();
    push("/");
  };

  return (
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <Show when={errors()}>
              <Errors errors={errors()} />
            </Show>

            <form onSubmit={prevent(submit)}>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    name="image"
                    value={store.user.image}
                    placeholder="URL of profile picture"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    name="username"
                    value={store.user.username}
                    placeholder="Your Name"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    name="bio"
                    placeholder="Short bio about you"
                  >
                    {store.user.bio}
                  </textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={store.user.email}
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
                  Update Settings
                </button>
              </fieldset>
            </form>

            <hr />

            <button onClick={logout} class="btn btn-outline-danger">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
