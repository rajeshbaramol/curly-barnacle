import store from './Setup/Store';

import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import photos from './components/photos';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/photos' component={photos}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
