import { createState } from 'solid-js';
import { useRouter } from 'solid-app-router';

import { useStore } from '../store';
import NavLink from '../components/NavLink';
import ListErrors from '../components/ListErrors';

export default () => {
  const [router, { push }] = useRouter();
  const [, { register, login }] = useStore();

  const [state, setState] = createState({
    username: '',
    inProgress: false,
    email: '',
    password: '',
    errors: '',
  });

  const isLogin = () => router.location.includes('login');
  const text = () => (isLogin() ? 'Sign in' : 'Sign up');

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    setState({ inProgress: true });

    const action$ = isLogin()
      ? login(state.email, state.password)
      : register(state.username, state.email, state.password);

    action$
      .then(() => push('/'))
      .catch((errors) => setState({ errors }))
      .finally(() => setState({ inProgress: false }));
  };

  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{text()}</h1>
            <p class="text-xs-center">
              {isLogin() ? (
                <NavLink route="/register">Need an account?</NavLink>
              ) : (
                <NavLink route="/login">Have an account?</NavLink>
              )}
            </p>

            <ListErrors errors={state.errors} />

            <form onSubmit={handleSubmit}>
              {!isLogin() && (
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={state.username}
                    onChange={(e) =>
                      setState('username', e.currentTarget.value)
                    }
                  />
                </fieldset>
              )}

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={state.email}
                  onChange={(e) => setState('email', e.currentTarget.value)}
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={(e) => setState('password', e.currentTarget.value)}
                />
              </fieldset>

              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={state.inProgress}
              >
                {text()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
