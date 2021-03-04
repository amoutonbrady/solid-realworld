import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';
import App from './App';
import { routes } from './routes';
import { Provider } from './store';

render(
  () => (
    <Provider>
      <Router routes={routes}>
        <App />
      </Router>
    </Provider>
  ),
  document.getElementById('app'),
);
